export async function fixture<T>(fileName: string): Promise<T> {
	return (await import(`../testing/fixtures/${fileName}.json`)).default
}
