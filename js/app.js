Vue.createApp({
    data() {
        return {
            valueInput: "",
            needDoList: [],
            completeList: []
        };
    },
    mounted() {
        if (localStorage.getItem('need')) {
            try {
                this.needDoList = JSON.parse(localStorage.getItem('need'));
            } catch (e) {
                localStorage.removeItem('need');
            }
        }
        if (localStorage.getItem('complete')) {
            try { 
                this.completeList = JSON.parse(localStorage.getItem('complete'));
            } catch (e) {
                localStorage.removeItem('complete');
            }
        }
    },
    methods: {
        handlyInput(event) {
            this.valueInput = event.target.value;
        },
        addTask() {
            if(this.valueInput === '') { return };
            this.needDoList.push({
                title: this.valueInput,
                id: Math.random()
            });
            this.valueInput = '';
            this.saveList('need');
        },
        doCheck(index, type) {
            if(type === 'need'){
                const completeMask = this.needDoList.splice(index, 1);
                this.completeList.push(...completeMask);
                this.saveList('need');
                this.saveList('complete')
            }
            else {
                const noCompleteMask = this.completeList.splice(index, 1);
                this.needDoList.push(...noCompleteMask);
                this.saveList('need');
                this.saveList('complete');
            }
        },
        removeMask(index, type) {
            if (type === 'need') {
                this.needDoList.splice(index, 1);
                this.saveList('need');
            }
            else {
                this.completeList.splice(index, 1);
                this.saveList('complete');
            }
        },
        saveList(type) {
            if (type === 'need') {
                const parsed = JSON.stringify(this.needDoList);
                localStorage.setItem('need', parsed);
            }
            else {
                const parsed = JSON.stringify(this.completeList);
                localStorage.setItem('complete', parsed);
            }
        }
    }
}).mount('#app');