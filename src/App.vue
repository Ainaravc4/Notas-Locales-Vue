<template>
  <div id="app">
    
    <Cabecera />

    <div class="inputs">
      <input placeholder="Buscar" type="text" v-model="buscar" >
      <input placeholder="¿Que quieres recordar?" type="text" v-model="nuevoRecordatorio" v-on:keyup.enter="anadirTarea" >
    </div>

    <hr>
    <div>
      <p>{{totalCompletados}} Tareas pendientes de un total de {{totalTareas}} | <span v-on:click="borrarTareasCompletadas" >X Borra tareas completadas</span></p>
    </div>
    <hr>
    
    <transition-group name="fade" tag="h1">
      <nota
        v-for="nota2 in miListaFiltrada"
        v-bind:key="nota2.titulo"
        v-bind:nota="nota2"
        v-on:borrarNota="eliminarNota(nota2)"
        v-on:cambioEnEstado="actualizarLocalStorage"/>
    </transition-group>
    
    <router-view></router-view>
  <Footer/>

    

  </div>
</template>

<script>
import Cabecera from './components/Cabecera.vue'
import nota from './components/nota.vue'
import Footer from './components/Footer.vue'

export default {
  name: 'App',
  components: {
    nota,
    Cabecera,
    Footer
  },
  data(){
    return{
      listaRecordarios:[],
      buscar:"",
      nuevoRecordatorio:""
    }
  },

  mounted(){
    if(localStorage.listaTareas){
      this.listaRecordarios=JSON.parse(localStorage.listaTareas);
    }
  },

  methods: {
    anadirTarea:function(){
            this.listaRecordarios.push({
               titulo: this.nuevoRecordatorio,
               prioridad: 0,
               fechaCreacion: new Date(),
               completado: false
            });
            this.nuevoRecordatorio="";
            this.actualizarLocalStorage();
        },       

    borrarTareasCompletadas: function(){
        this.listaRecordarios=this.listaRecordarios.filter((nota)=>{
            return !nota.completado;
        })
        this.actualizarLocalStorage();
        
    },
    eliminarNota:function(nota3){
        var i= this.listaRecordarios.indexOf(nota3)
        this.listaRecordarios.splice(i,1)
        this.actualizarLocalStorage();
        
    },
    actualizarLocalStorage: function(){
        localStorage.listaTareas = JSON.stringify(this.listaRecordarios);
    }
  },
 
  computed:{
    totalTareas: function(){
      return this.listaRecordarios.length;
    },
    totalCompletados: function(){
      let totalPendientes=0;
      for(let recordatorio of this.listaRecordarios){
          if(!recordatorio.completado){
              totalPendientes++;
          }
      }
      return totalPendientes;
    },
    miListaFiltrada: function(){
            let listaFiltrada;
            if(this.buscar=="")
                listaFiltrada=this.listaRecordarios;
            
            else
                listaFiltrada= this.listaRecordarios.filter((recordatorio)=>{
                    if(recordatorio.titulo.indexOf(this.buscar)>=0){
                        return true;
                    }else{
                        return false;
                    }
                }); 
            
                listaFiltrada=listaFiltrada.sort((nota1, nota2)=>{
                if(nota1.prioridad>nota2.prioridad){
                    return -1;
                }
                if(nota1.prioridad<nota2.prioridad){
                    return 1;
                }
                return 0;
            })

            return listaFiltrada;
        }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: white;
  margin-top: 60px;
  margin-left: 5rem;
  margin-right: 5rem;
  
}
.inputs{
  display: flex;
  flex-flow: column;
}
input{
  height: 3rem;
  border-radius: 10px;
}
input::placeholder{
  font-size: 15px;
}
span{
  color: orange;
}
body{
  background-color: black  !important;
}
.fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
      }
    .fade-enter, .fade-leave-to {
      opacity: 0;
    }
</style>
