export async function GET(request: Request) {
  return Response.json({ some: "data", more: "information" }, { status: 307, statusText: "Temporary Redirect" });
}
