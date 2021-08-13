//////////////////////////////////////////////////////////////////////
//
//                     A  T  T  E  N  T  I  O  N
//
// Sorry, but I haven't figured out a way to mock fetch with Sinon
// when running inside a node environment.
// I also haven't figured out how to run the tests in a browser.
// Maybe `karma` can help there.
//
// For now I simply disabled this file through comments, but I
// wanted to keep the file and the failed attempts around for
// reference.
//
//////////////////////////////////////////////////////////////////////

import { objectToGetParams } from './http'

// import { COMMON_FETCH_OPTIONS, post } from './http-request'

// const __HAS_FETCH = 'fetch' in globalThis
// const installFakeFetch = __HAS_FETCH
// 	? (fake: SinonSpy): SinonSpy => {
// 			sinon.replace(globalThis, 'fetch', fake)
// 			console.log('Replacing globalThis.fetch')
// 			return fake
// 	  }
// 	: (fake: SinonSpy): SinonSpy => {
// 			console.log('Setting globalThis.fetch')
// 			globalThis.fetch = fake
// 			return fake
// 	  }
// const removeFakeFetch = __HAS_FETCH
// 	? sinon.restore
// 	: () => {
// 			delete globalThis.fetch
// 	  }

// const DEFAULT_URL = 'http://localhost:8080'

describe('module http', () => {
	// 	afterEach(() => {
	// 		removeFakeFetch()
	// 	})
	// 	it('post sends out a POST request to the right URL', async () => {
	// 		const fakeFetch = installFakeFetch(sinon.fake.returns([]))
	// 		await post(DEFAULT_URL)
	// 		expect(fakeFetch.callCount).to.equal(1)
	// 		expect(fakeFetch.getCall(0).args).to.be.an('array').of.length(2)
	// 		expect(fakeFetch.getCall(0).args[0]).to.equal([DEFAULT_URL])
	// 		expect(fakeFetch.getCall(0).args[1]).to.have.own.property('method', 'POST')
	// 	})

	// 	it('post uses the COMMON_FETCH_OPTIONS', async () => {
	// 		const fakeFetch = installFakeFetch(sinon.fake.returns([]))
	// 		await post(DEFAULT_URL)
	// 		expect(fakeFetch.callCount).to.equal(1)
	// 		expect(fakeFetch.getCall(0).args).to.be.an('array').of.length(2)
	// 		const args = fakeFetch.getCall(0).args
	// 		Object.keys(COMMON_FETCH_OPTIONS).forEach(el => {
	// 			expect(args[1]).to.have.own.property(
	// 				el,
	// 				(COMMON_FETCH_OPTIONS as any)[el]
	// 			)
	// 		})
	// 	})

	// 	it('post sends the payload as JSON string in the body of the request', async () => {
	// 		const payload = { just: 'some', test: 'data' }
	// 		const fakeFetch = installFakeFetch(sinon.fake.returns([]))
	// 		await post(DEFAULT_URL, payload)
	// 		expect(fakeFetch.callCount).to.equal(1)
	// 		expect(fakeFetch.getCall(0).args).to.be.an('array').of.length(2)
	// 		const args = fakeFetch.getCall(0).args
	// 		expect(args[1]).to.have.own.property('body', JSON.stringify(payload))
	// 	})

	// 	it('post fails on rejected fetch Promise', async () => {
	// 		const fakeFetch = installFakeFetch(
	// 			sinon.fake.throws(new Error('fake network error'))
	// 		)
	// 		try {
	// 			await post(DEFAULT_URL)
	// 		} catch (e) {
	// 			expect(fakeFetch.callCount).to.equal(1)
	// 			expect(e).to.be.an('error')
	// 			expect(e.message).to.equal('fake network error')
	// 		}
	// 	})

	// 	it('post fails if !response.ok', async () => {
	// 		const fakeResponse = new Response('', {
	// 			status: 500,
	// 			statusText: 'some status',
	// 		})
	// 		const fakeFetch = installFakeFetch(sinon.fake.resolves(fakeResponse))
	// 		try {
	// 			await post(DEFAULT_URL)
	// 		} catch (e) {
	// 			expect(fakeFetch.callCount).to.equal(1)
	// 			expect(e).to.be.an('error')
	// 			expect(e.message).to.equal('500: some status')
	// 		}
	// 	})

	describe('objectToGetParams', () => {
		it('works on simple strings', () => {
			const obj = { a: 'alpha' }
			const converted = objectToGetParams(obj)
			expect(converted).toBe('a=alpha')
		})

		it('joins multiple values with &', () => {
			const obj = { a: 'alpha', b: 'bravo', c: 'charlie' }
			const converted = objectToGetParams(obj)
			expect(converted).toBe('a=alpha&b=bravo&c=charlie')
		})

		it('URI encodes key', () => {
			const obj = { 'some thing': 'else' }
			const converted = objectToGetParams(obj)
			expect(converted).toBe('some%20thing=else')
		})

		it('URI encodes value', () => {
			const obj = { email: 'johndoe@example.org' }
			const converted = objectToGetParams(obj)
			expect(converted).toBe('email=johndoe%40example.org')
		})
	})
})
