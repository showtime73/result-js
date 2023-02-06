import {Result} from "./Result"

/**
 * Shape spec
 */
export type TSuccessResultCreationProperties<R, N> = [R, N]
export type TErrorResultCreationProperties<N> = [N, string | Error]
export type TResultCreationProperties<R = unknown, N = null> =
	| TSuccessResultCreationProperties<R, N>
	| TErrorResultCreationProperties<N>

export interface IResult<R> {
	readonly error?: Error
	readonly value?: R
	readonly isOk: boolean
	readonly isSuccess: boolean
	readonly isError: boolean
	readonly isFailure: boolean
}

/**
 * Logic spec
 */
describe("Result class", () => {
	it("should create a correct failure result object, when given an error message string", () => {
		const msgError = "bam!"
		const r: Result = Result.fail(msgError)
		expect(r).toBeInstanceOf(Result)
		expect(r.isError).toBe(true)
		expect(r.isFailure).toBe(true)
		expect(r.isOk).toBe(false)
		expect(r.isSuccess).toBe(false)
		expect(r.value).toBeUndefined()
		expect(r.error).toBeInstanceOf(Error)
		if (r.error) {
			expect(r.error.message).toBe(msgError)
		}
	})
	it("should create a correct failure result object, when given an error object", () => {
		const msgError = "bam!"
		const err = new Error(msgError)
		const r: Result = Result.fail(err)
		expect(r).toBeInstanceOf(Result)
		expect(r.isError).toBe(true)
		expect(r.isFailure).toBe(true)
		expect(r.isOk).toBe(false)
		expect(r.isSuccess).toBe(false)
		expect(r.value).toBeUndefined()
		expect(r.error).toBeInstanceOf(Error)
		if (r.error) {
			expect(r.error).toBe(err)
			expect(r.error.message).toBe(msgError)
		}
	})
	it("should create a correct success result object", () => {
		const value = "foo"
		const r: Result = Result.success<string>(value)
		expect(r).toBeInstanceOf(Result)
		expect(r.isError).toBe(false)
		expect(r.isFailure).toBe(false)
		expect(r.isOk).toBe(true)
		expect(r.isSuccess).toBe(true)
		expect(r.value).toBe(value)
		expect(r.error).toBeUndefined()
	})
})
