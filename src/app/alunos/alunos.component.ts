import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-alunos',
  templateUrl: './alunos.component.html',
  styleUrl: './alunos.component.css'
})
export class AlunosComponent {

  AlunosArray : any[] = [];
  isResultLoaded = false;
 
  
  nome: string ="";
  pais: string ="";
  telefone: Number =0;
 
  currentAlunosID = "";
constructor(private http: HttpClient )
  {
    this.getAllAlunos();
 
  }
  getAllAlunos()
  {
    
    this.http.get("http://127.0.0.1:8000/api/alunos")
  
    .subscribe((resultData: any)=>
    {
        this.isResultLoaded = true;
        console.log(resultData);
        this.AlunosArray = resultData;
    });
  }
 
  register()
  {
  
    let bodyData = {
      "Nome" : this.nome,
      "Pais" : this.pais,
      "Telefone" : this.telefone
    };
 
    this.http.post("http://127.0.0.1:8000/api/alunos",bodyData,{responseType: 'text'}).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("Alunos Registered Successfully");
        this.getAllAlunos();
        this.nome = '';
        this.pais = '';
        this.telefone  = 0;
    });
  }
  setUpdate(data: any)
  {
   this.nome = data.name;
   this.pais = data.address;
   this.telefone = data.phone;
   this.currentAlunosID = data.id;
  }
 
  UpdateRecords()
  {
    let bodyData = {
      "id" : this.currentAlunosID,
      "name" : this.nome,
      "address" : this.pais,
      "phone" : this.telefone,
  
    };
    
    this.http.put("http://127.0.0.1:8000/api/alunos"+ "/"+ this.currentAlunosID,bodyData).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("Student Registered Updateddd")
        this.getAllAlunos();
      
    });
  }
 
  save()
  {
    if(this.currentAlunosID == '')
    {
        this.register();
    }
      else
      {
       this.UpdateRecords();
      }      
 
  }
 
  setDelete(data: any)
  {
    
    
    this.http.delete("http://127.0.0.1:8000/api/alunos"+ "/"+ data.id,{responseType: 'text'}).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("Alunos Deleteddd")
        this.getAllAlunos();
        this.nome = '';
        this.pais = '';
        this.telefone  = 0;
  
    });
 
  }
}