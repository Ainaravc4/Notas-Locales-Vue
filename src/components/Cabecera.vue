<template lang="html">

  <section class="cabecera">
    
    <h1> {{this.titulo}} </h1><!--|capitalice(idioma)-->
    <!--<router-link to="Footer">Pie</router-link>-->
  </section>

</template>

<script lang="js">

  export default  {
    name: 'cabecera',
    props: ['ejemplo'],
    mounted () {

    },
    data () {
      return {
        titulo:"proyecto Vue.js- Ainara",
        idioma:"en"
      }
    },
    filters:{
      capitalice: function (valor, idi) {
        //return valor[0].toUpperCase()+valor.slice(1);
        if(idi=="en")
          return valor + "eng";
        else
          return valor +"spa"
      }
    }
}


</script>

<style >
  
  h1{
    font-size: 32px;
  }
</style>
