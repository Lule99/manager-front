import { Link } from 'react-router-dom';

const PageNotFound = () => {
    return <>
        <div class="authincation vh-100">
            <div class="container h-100">
                <div class="row justify-content-center h-100 align-items-center">
                    <div class="col-md-8">
                        <div class="form-input-content text-center error-page">
                            <h1 class="error-text font-weight-bold">404</h1>
                            <h4><i class="fa fa-exclamation-triangle text-warning"></i>Tražena stranica nije pronađena!</h4>
                            <p>Pokušajte ponovo!</p>
                            <div>
                                <Link class="btn btn-primary" to="/api/home">Nazad</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}  

export default PageNotFound;