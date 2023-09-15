<script lang="ts">
	let isLoading = false;
	async function submitPasswordReset(email: string): Promise<void> {
		const payload = {
			email: email
		};
		try {
			isLoading = true;
			const response = await fetch('/api/password-reset', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(payload)
			});
			const data = await response.json();

			message = 'Please check your email for the password reset link.';
		} catch (error) {
			console.log(error);
			message = 'Something went wrong. Please try again.';
		}
		isLoading = false;
	}
	let email = '';
	let message = '';
</script>

<div class="wrapper">
	<!--start content-->
	<main class="authentication-content">
		<div class="container-fluid">
			<div class="authentication-card">
				<div class="card shadow rounded-5 overflow-hidden">
					<div class="row g-0">
						<div class="col-lg-6 d-flex align-items-center justify-content-center border-end">
							<img
								src="https://img.freepik.com/free-vector/man-thinking-concept-illustration_114360-7990.jpg?w=740&t=st=1662791646~exp=1662792246~hmac=a0cee1f7c7f898b2b47bfafc0c477f3f0ef9151e3488056c41b74ae4a3e6acb9"
								class="img-fluid"
								alt=""
							/>
						</div>
						<div class="col-lg-6">
							<div class="card-body p-4 p-sm-5">
								<h5 class="card-title">Forgot Password?</h5>
								<p class="card-text mb-5">Enter your registered email to reset the password</p>

								<div class="row g-3">
									<div class="col-12">
										<label for="inputEmailid" class="form-label">Email</label>
										<input
											type="email"
											class="form-control form-control-lg radius-30"
											id="inputEmailid"
											placeholder="Email"
											bind:value={email}
										/>
									</div>
									<div class="col-12">
										<div class="d-grid gap-3">
											<button
												on:click={() => {
													if (!email) {
														alert('Please enter your email');
														return;
													}
													submitPasswordReset(email);
												}}
												disabled={isLoading}
												class="btn btn-lg btn-primary radius-30"
											>
												{#if isLoading}
													Resetting Password...
												{:else}
													Reset Password
												{/if}
											</button>
											<a href="/" class="btn btn-lg btn-light radius-30">Back to Login</a>
										</div>
									</div>
									{#if message}
										<div class="alert border-0 bg-light-success alert-dismissible fade show py-2">
											<div class="d-flex align-items-center">
												<div class="fs-3 text-success"><i class="bi bi-check-circle-fill" /></div>
												<div class="ms-3">
													<div class="text-success">{message}</div>
												</div>
											</div>
											<button
												type="button"
												class="btn-close"
												data-bs-dismiss="alert"
												aria-label="Close"
											/>
										</div>{/if}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</main>

	<!--end page main-->
</div>
