export async function fixture<T>(fileName: string): Promise<T> {
	return (await fetch(`/fixtures/${fileName}.json`)).json()
}
