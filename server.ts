// import { serve } from "https://deno.land/std/http/server.ts";
// import { refresh } from "https://deno.land/x/refresh/mod.ts";

// // Create refresh middleware
// const middleware = refresh();

// serve( async ( req ) =>
// {
//     // In your server handler, just add into the middleware stack!
//     const res = middleware( req );

//     if ( res ) return res;
//     const hello = await Deno.readFile( './index.html' );

//     return new Response( hello, { status: 200, headers: { "Content-type": "text/html" } } );
// } );

import { Application } from "https://deno.land/x/oak/mod.ts";

const app = new Application();

app.use( async ( context, next ) =>
{
    try
    {
        await context.send( {
            root: `${ Deno.cwd() }/`,
            index: "index.html",
        } );
    } catch {
        next();
    }
} );

await app.listen( { port: 8000 } );