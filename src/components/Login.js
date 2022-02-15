import {Link} from 'react-router-dom'

const Login = () => {
  return (
    <>
    <div class="authincation h-100">
    <div class="container vh-100">
        <div class="row justify-content-center h-100 align-items-center">
            <div class="col-lg-6 col-md-8">
                <div class="authincation-content">
                    <div class="row no-gutters">
                        <div class="col-xl-12">
                            <div class="auth-form">
                                <div class="text-center mb-3">
                                    <a><h2>Servis za vakcinaciju građana</h2></a>
                                </div>
                                <h4 class="text-center mb-4" style={{marginBottom: '2 rem'}}>Prijava korisnika</h4>
                                <form>
                                    <div class="form-group">
                                        <label class="mb-1"><strong>Korisničko ime</strong></label>
                                        <input type="text" class="form-control" formControlName="username"/>
                                    </div>
                                    <div class="form-group">
                                        <label class="mb-1"><strong>Lozinka</strong></label>
                                        <input type="password" class="form-control" formControlName="password"/>
                                    </div>
                                    <div class="text-center">
                                        <button type="submit" class="btn btn-primary btn-block">Prijava</button>
                                    </div>
                                </form>
                                <div class="new-account mt-3">
                                    <p>Želite da se registrujete? 
                                        <Link to={"/api/registration"}><span class="text-primary">Registracija</span></Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

    </>
  )
}

export default Login