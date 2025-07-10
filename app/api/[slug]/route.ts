interface RouteParams {
    params: {
        slug?: string | string[];
    };
}

export async function GET(request: Request, { params }: RouteParams): Promise<Response> {
    return new Response(
        JSON.stringify({
            method: 'GET',
            slug: params.slug || [],
        }),
        { status: 200 }
    );
}

export async function POST(request: Request, { params }: RouteParams): Promise<Response> {
  const body = await request.json();
  return new Response(
    JSON.stringify({
      method: 'POST',
      slug: params.slug || [],
      body,
    }),
    { status: 200 }
  );
}

export async function PUT(request: Request, { params }: RouteParams): Promise<Response> {
  const body = await request.json();
  return new Response(
    JSON.stringify({
      method: 'PUT',
      slug: params.slug || [],
      body,
    }),
    { status: 200 }
  );
}

export async function DELETE(request: Request, { params }: RouteParams): Promise<Response> {
  return new Response(
    JSON.stringify({
      method: 'DELETE',
      slug: params.slug || [],
    }),
    { status: 200 }
  );
}
