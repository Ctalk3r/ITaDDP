let Error404 = {

    render : async () => {
        let view =  /*html*/`
            <main>
                <h1> 404 Error </h1>
            </main>
        `
        return view
    }
    , after_render: async () => {
    }
}
export default Error404;