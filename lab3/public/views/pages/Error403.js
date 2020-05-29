let Error403 = {

    render : async () => {
        let view =  /*html*/`
            <main>
                <h1> Error 403. Forbidden </h1>
            </main>
        `
        return view
    }
    , after_render: async () => {
    }
}
export default Error403;