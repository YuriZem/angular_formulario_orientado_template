import { ConsultaCepService } from './../service/consulta-cep.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  constructor(
    private router: Router,
    private consultaCepService:ConsultaCepService
  ) { }

  ngOnInit(): void {
  }

  cadastrar(form: NgForm){
    if(form.valid){
      this.router.navigate(['./sucesso'])
    }else{
      alert('formulario invalido')
    }
  }

  consultaCep(event:any, f:NgForm){
    const cep = event.target.value;
    if(cep!=''){
      this.consultaCepService.getConsultaCep(cep).subscribe(res => {
        this.populandoEndereco(res,f)
      })
    }
  }
  populandoEndereco(dados:any,f:NgForm){
    console.log(dados)
    f.form.patchValue({
      endereco:dados.logradouro,
      cidade:dados.localidade,
      uf:dados.uf,
      bairro:dados.bairro,
      complemento:dados.complemento
    })
  }
}
