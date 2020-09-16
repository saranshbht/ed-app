<template>
	<v-container fill-height fluid>
      <!-- <v-flex xs3 style="background-image: url('http://cdn.wallpapersafari.com/7/86/gqiGH7.jpg')">
        <v-card height="500px"></v-card>
      </v-flex> -->
		<v-flex md4 sm6 xs10 mx-auto my-6>
			<v-container class="text-center">
				<v-card flat>
					<v-card-title primary-title>
						<h3>Welcome Back! &#x1F607;</h3>
					</v-card-title>
					<v-form>
						<v-text-field
							outlined
							prepend-inner-icon="mdi-email"
							name="Email"
							label="Email">
						</v-text-field>
						<v-text-field
							outlined
							prepend-inner-icon="mdi-lock"
							name="Password"
							label="Password"
							type="password">
						</v-text-field>
						<v-card-actions>
							<v-btn color="primary" large block>Login</v-btn>
						</v-card-actions>
					</v-form>
					<a href="">Forgot Password?</a>

					<div class="my-6">
						<h2>OR</h2>
						<h3>Continue with...</h3>
					</div>
					<v-row justify="space-around" class="my-6">
						<v-icon color="red" large>mdi-google</v-icon>
						<v-icon color="indigo" large>mdi-facebook</v-icon>
						<v-icon color="black" large>mdi-apple</v-icon>
					</v-row>
				</v-card>
			</v-container>
			<v-footer class="justify-center my-6">
				Don't have an account yet?{{'\xa0'}}
				<strong><a href="">Sign up</a></strong>
			</v-footer>
		</v-flex>
	</v-container>
</template>
