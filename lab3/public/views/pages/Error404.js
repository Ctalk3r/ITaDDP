let Error404 = {

    render : async () => {
        let view =  /*html*/`
            <main>
                <h1> Error 404. Not found </h1>
            </main>
        `
        return view
    }
    , after_render: async () => {
    }
}
export default Error404;