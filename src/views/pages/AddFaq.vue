<template>
    <vs-row vs-justify="center">
    <vs-row vs-justify="center">
    <vs-col type="flex" vs-justify="center" vs-align="center" vs-w="6">
    </vs-col>
    </vs-row><br><br>

    <vs-col type="flex" vs-justify="center" vs-align="center" vs-w="10">
        <vs-card>
        <div slot="header">
            <h3>
            Add FAQ
            </h3>
        </div>
        <div vs-justify="center">
            <vs-input
                name="question"
                icon-no-border
                icon="icon icon-user"
                icon-pack="feather"
                label-placeholder="Question"
                v-model="faq.question"
                class="w-full"/>
            <br />
            <vs-textarea
                rows=7
                name="answer"
                height="200px" 
                icon-no-border
                icon="icon icon-user"
                icon-pack="feather"
                label="Answer"
                v-model="faq.answer"/>
            <br /><br /><br />
            <vs-button class="btnx" type="filled">{{select}}</vs-button>
            <vs-dropdown>
            <vs-button class="btn-drop" type="filled" icon="expand_more"></vs-button>
            <!-- <a href="#">Hola mundo</a> -->
            <vs-dropdown-menu>
                <vs-dropdown-item>
                <span @click="faq.category='General'; select='General'">General</span>
                </vs-dropdown-item>
                <vs-dropdown-item>
                <span @click="faq.category='Licenses'; select='Licenses'">Licenses</span>
                </vs-dropdown-item>
                <vs-dropdown-item>
                <span @click="faq.category='Company usage'; select='Company usage'">Company usage</span>
                </vs-dropdown-item>
                <vs-dropdown-item>
                <span @click="faq.category='Trademark use'; select='Trademark use'">Trademark use</span>
                </vs-dropdown-item>
            </vs-dropdown-menu>
            </vs-dropdown><br>
        </div>
        <div slot="footer">
            <vs-row vs-justify="center">
            <vs-button type="gradient" color="success" icon="touch_app" @click="submit">Submit</vs-button>
            <vs-button color="danger" icon="reply" @click="goBack">Go Back</vs-button>
            </vs-row>
        </div>
        </vs-card>
    </vs-col>
    </vs-row>
</template>

<script>
    import axios from 'axios';
    export default{
        data(){
            return {
                colorAlert:'success',
                alertMessage:'',
                activeA:false,
                select:'Select Category',
                faq:{
                    category:'',
                    question:'',
                    answer:''
                }
            }
        },
        methods: {
            submit(){
                return new Promise((resolve, reject) => {
                    axios.post('/faq/addQuestion', this.faq).then(resp => {
                    // this.colorAlert='success';
                    this.alertMessage='FAQ added succesfully';
                    // this.$vs.dialog({
                    //     color: this.colorAlert,
                    //     title: this.alertMessage,
                    //     accept: this.acceptAlert
                    // })
                    this.$vs.notify({
                        title: 'Success',
                        text: this.alertMessage,
                        color: 'success',
                        iconPack: 'feather',
                        position: 'top-center',
                        icon:'icon-check'
                    })
                    resolve(resp)
                    }).catch(err => {
                        this.colorAlert='danger';
                        this.alertMessage='An Error occured';
                        this.$vs.dialog({
                        color: this.colorAlert,
                        title: this.alertMessage,
                        accept: this.acceptAlert
                    })
                        reject(err)
                    })
                });
            },
            goBack(){
                this.$router.push('/pages/faq')
            }
        },
        components:{

        }
    }
</script>

<style lang="scss">
</style>