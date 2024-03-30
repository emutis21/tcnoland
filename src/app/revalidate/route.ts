import { revalidatePath } from 'next/cache'
import { type NextRequest } from 'next/server'

// eslint-disable-next-line @typescript-eslint/require-await
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams

  if (searchParams.get('products') !== process.env.PRODUCTS) {
    return Response.json({ revalidated: false })
  }

  revalidatePath('/')

  return Response.json({ revalidated: true })
}
