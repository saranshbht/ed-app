<template>
    
    <v-container v-if="!loading" fluid>
        <v-layout  column>
            <v-card fill-height>
                <v-card-text>
                    <v-row justify="space-around" class="my-5">
                        <v-avatar color="orange" size="96">
							<span class="white--text headline">SB</span>
                        </v-avatar>
                    </v-row>

					<v-row justify="space-around" class="mb-3">
						<v-btn dark>Change Avatar</v-btn>
                    </v-row>
					<v-textarea
						auto-grow
						clearable
						:rows="1"
						:row-height="24"
						v-model="form.about"
						label="About">
                    </v-textarea>
                    <v-text-field
						clearable
                        v-model="form.firstName"
                        label="First Name">
					</v-text-field>
                    <v-text-field
						clearable
                        v-model="form.lastName"
                        label="Last Name">
					</v-text-field>
                    <v-text-field
						clearable
                        v-model="form.email"
                        label="Email Address">
					</v-text-field>
					<v-text-field
						clearable
                        v-model="form.mobile"
                        label="Mobile Number">
					</v-text-field>
					<v-text-field
						clearable
                        v-model="form.password"
                        label="Password"
                        :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="show ? 'text' : 'password'"
                        @click:append="show = !show">
					</v-text-field>
                </v-card-text>
                <v-card-actions>
                
                        <v-btn color="primary" :loading="loading"
                            :disabled="loading"
                         @click="onSaveChanges">
                        <v-icon left dark>mdi-check</v-icon>
                        Save Changes
                    </v-btn>
                
                </v-card-actions>
            </v-card>
        </v-layout>
    </v-container>
</template>

<script>
    // import AvatarPicker from './components/AvatarPicker'
    export default {
        pageTitle: 'My Profile',
        // components: { AvatarPicker },
        computed: {
            loading() {
                return this.$store.getters.loading
            },
            user() {
                return this.$store.getters.user
            },
            form() {
                return {
                    firstName: this.user.firstName,
                    lastName: this.user.lastName,
                    email: this.user.email,
                    mobile: this.user.mobile,
                    about: this.user.about,
                    password: this.user.password
                }
            }
        },
        data () {
            return {
                
                
                show: false
            }
        },
        methods: {
            openAvatarPicker () {
                this.showAvatarPicker = true
            },
            selectAvatar (avatar) {
                this.form.avatar = avatar
            },
            onSaveChanges() {
                if(this.form.firstName.trim() === '' ||
                this.form.lastName.trim() === '' ||
                this.form.email.trim() === '' ||
                this.form.password.trim() === '')
                return

                this.$store.dispatch('updateUser', {
                    id: this.user.id,
                    ...this.form
                })
                this.$router.push('/')
            }
        }
    }
</script>
