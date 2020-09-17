<template>
    <v-container fluid>
        <v-layout column>
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
                        v-model="form.contactEmail"
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
                    <router-link to = "/">
                        <v-btn color="primary" :loading="loading" @click.native="update">
                        <v-icon left dark>mdi-check</v-icon>
                        Save Changes
                    </v-btn>
                    </router-link>
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
        data () {
            return {
                loading: false,
                form: {
                    firstName: 'John',
                    lastName: 'Doe',
                    contactEmail: 'john@doe.com',
                    mobile: '1234567890',
                    about: 'About me',
                    password: 'something'
                },
                show: false
            }
        },
        methods: {
            openAvatarPicker () {
                this.showAvatarPicker = true
            },
            selectAvatar (avatar) {
                this.form.avatar = avatar
            }
        }
    }
</script>
