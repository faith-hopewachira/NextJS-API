// CREATING AN API TO CALL AN EXTERNAL API

export async function POST(request:Request) {
    const baseUrl = process.env.BASE_URL;
    // GETTING THE BODY DATA
    // const body = request.json();

    const {username, password}  = await request.json();
    // CHECKING IF EMPTY
    if(!username && !password){
        return new Response('Username and paswword missing', {
            status: 400,
        })

    }
    // FETCHING DATA FROM API
    try{
        const response = await fetch(`${baseUrl}/auth/login`,{
            method: 'POST',
            headers:{
                'Content-type':'application/json'

            }, 
            body:JSON.stringify({ username, password}),

        }
        );
        const result = await response.json();

        return new Response(JSON.stringify(result),{
            status:201,
            // statusText: "Login successful",
        });

       


    }
    
    catch(error){
        return new Response((error as Error).message,{
            status: 500
        });

    }
    


    
}