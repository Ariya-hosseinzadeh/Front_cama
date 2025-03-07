const Headers=()=>{
    return(
        <>
            <div >
                <div className="grid grid-cols-4 h-20">
                    <di className='bg-slate-300 grid grid-cols-4'>
                        <div className="col-start-2">
                            menu
                        </div>
                        <div>
                            lang
                        </div>
                        <div>
                            dark
                        </div>
                    </di>
                    <div className='bg-slate-600 col-span-2 grid grid-cols-8 grid-rows-4'>
                        <div className=" bg-slate-50 col-start-2 col-end-8 row-span-2 row-start-2">

                        </div>
                    </div>
                    <div className='bg-slate-900'></div>
                </div>
            </div>
        </>
    )
}
export default Headers