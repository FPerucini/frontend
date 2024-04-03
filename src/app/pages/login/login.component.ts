import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginModel } from '../../models/LoginModel';
import { Router } from '@angular/router';
// import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  errorMessage!: string;
  authService: any;

  constructor(private formBuilder: FormBuilder,
              //  private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  submitLogin() {
    if (this.loginForm.valid) {
      const loginData: LoginModel = this.loginForm.getRawValue() as LoginModel;
      this.authService.login(loginData).subscribe(
        (response: any) => {
          // Lógica para tratar a resposta da API após o login bem-sucedido
          console.log('Login bem-sucedido', response);
          // Redirecionar para a página de destino após o login
          this.router.navigate(['/http://127.0.0.1:8000/api/login']); // substitua '/dashboard' pela rota desejada
        },
        (error: any) => {
          // Lógica para tratar o erro de login
          console.error('Erro ao fazer login', error);
          this.errorMessage = 'Credenciais inválidas. Por favor, tente novamente.'; // ou outra mensagem de erro
        }
      );
    }
  }

  logout() {
    this.authService.logout().subscribe(
      (response: any) => {
        console.log('Logout bem-sucedido', response);
        // Redirecionar para a página de login ou outra página após o logout
        this.router.navigate(['/login']); // substitua '/login' pela rota de login
      },
      (error: any) => {
        console.error('Erro ao fazer logout', error);
        // Lógica para tratar erros de logout, se necessário
      }
    );
  }
}
