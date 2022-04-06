

const server = Deno.listen( { port: 8080 } );

const page404 = '<html><body><h1>Object not found</h1></body></html>';
const mimetypes: Record<string, string> = { 'svg': 'image/svg+xml', 'jpg': 'image/jpeg', 'png': 'image/png', 'txt': 'text/plain', 'css': 'text/css', 'jpeg': 'image/jpeg', 'js': 'application/javascript' };
const hello = await Deno.readFile( './index.html' );
for await ( const conn of server ) { handle( conn ); }


async function handle ( conn: Deno.Conn )
{
    const httpConn = Deno.serveHttp( conn );
    for await ( const requestEvent of httpConn )
    {
        console.log( 'requestEvent.request.url ', requestEvent.request.url );
        const url = new URL( requestEvent.request.url );
        const p = url.pathname;
        const mime = String( mimetypes[ p.substring( p.lastIndexOf( '.' ) + 1 ) ] );
        console.log( 'Mime: ', mime, p );
        if ( p == '/favicon.ico' || p == '/robots.txt' || p.substring( 0, 7 ) == '/static' || mime === 'application/javascript' )
        {
            try
            {
                await Deno.stat( "." + p );
                const buf = await Deno.readFile( "." + p );
                await requestEvent.respondWith(
                    new Response( buf, { status: 200, headers: { "Content-type": mime } } ) );
            } catch ( _error )
            {
                await requestEvent.respondWith(
                    new Response( page404, { status: 404, headers: { "Content-type": "text/html" } } ) );
            }
        } else
        {
            await requestEvent.respondWith(
                new Response( hello, { status: 200, headers: { "Content-type": "text/html" } } ) );
        }
    }
}