const vue = Vue.createApp({
    data(){
        return {
            animeInModal: {Nimi: null}, 
            animes: []
        }
    },
    async created(){
        this.animes = await (await fetch('http://localhost:8080/animes')).json();
    },
    methods:{
        getAnime: async function(id){
            this.animeInModal = await (await fetch(`http://localhost:8080/animes/${id}`)).json();
            let animeInfoModal = new bootstrap.Modal(document.getElementById('animeInfoModal'),{})
            animeInfoModal.show();
        }
    }
}).mount('#app')