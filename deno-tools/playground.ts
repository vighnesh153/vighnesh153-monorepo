Deno.serve((_req, connInfo) => {
    console.log(connInfo.remoteAddr);
    return new Response(
        JSON.stringify({
            message: "Yippee!",
        }),
        {
            headers: {
                "Content-Type": "application/json",
            },
        },
    );
});
