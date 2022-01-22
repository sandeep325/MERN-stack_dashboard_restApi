import React from "react";

const PageNotFound = () => {

    return (
        <>
            <div className="page-wrapper">
                <div className="page-container">
                    <div className="container-fluid">

                        <div class="col-lg-2"></div>
                        <div class="col-lg-8 mt-4">
                            <div class="card">
                                <div class="card-header text-center" style={{color:"red"}}>Page Not Found</div>
                                <div class="card-body">
                                    
                                <h3 class="text-center" style={{color:"red"}}>Opps ! 404 Error. </h3>


                                </div>
                            </div>
                        </div>
                        <div class="col-lg-2"></div>
                    </div></div></div>
        </>
    );

}
export default PageNotFound;