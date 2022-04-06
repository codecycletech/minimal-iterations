import { serve } from "https://deno.land/std/http/server.ts";
import { refresh } from "https://deno.land/x/refresh/mod.ts";

// Create refresh middleware
const middleware = refresh();

serve( async ( req ) =>
{
    // In your server handler, just add into the middleware stack!
    const res = middleware( req );

    if ( res ) return res;
    const hello = await Deno.readFile( './index.html' );

    return new Response( hello, { status: 200, headers: { "Content-type": "text/html" } } );
} );