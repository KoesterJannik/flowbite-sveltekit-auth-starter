<script>
	import Icon from '@iconify/svelte';
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Textarea } from '$lib/components/ui/textarea';
	let CONVERSATION = [
		{
			role: 'bot',
			message: 'Hello, we are Köster Webservice.How can we help you?'
		}
	];
	let newQuestion = 'Welche Services bietet ihr an?';
	let isLoading = false;
	async function submitQuestions() {
		CONVERSATION = [...CONVERSATION, { role: 'user', message: newQuestion }];
		newQuestion = '';
		try {
			isLoading = true;
			console.log('submitQuestions');
			const res = await fetch('/api/chatter/ask', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					message: CONVERSATION
				})
			});
			const json = await res.json();
			CONVERSATION = json.messages;
			console.log(json);
		} catch (error) {
			console.log(error);
		}
		isLoading = false;
	}
</script>

<Dialog.Root>
	<Dialog.Trigger>
		<Icon class="absolute bottom-4 left-4 w-12 h-12 cursor-pointer " icon="simple-icons:chatbot" />
	</Dialog.Trigger>
	<Dialog.Content class="sm:max-w-[425px]">
		<Dialog.Header>
			<Dialog.Title>Ask us anything</Dialog.Title>
			<Dialog.Description>What do you want to know?</Dialog.Description>
		</Dialog.Header>
		<div class="flex">
			<div class="flex-1">
				<div class="flex flex-col gap-2">
					{#each CONVERSATION as { role, message }}
						<div class="flex gap-2">
							<div class="flex-1">
								<div class="flex gap-2">
									{#if role == 'bot'}
										<div class="flex-shrink-0">
											<img class="h-10 w-10 rounded-full" src="/landing/me.jpeg" alt="me" />
										</div>
									{/if}
									<div class="flex-1 bg-gray-100 rounded-lg p-2">
										<p class="text-sm text-gray-900">{message}</p>
									</div>
								</div>
							</div>
						</div>
					{/each}
				</div>
			</div>
		</div>
		<Textarea bind:value={newQuestion} />
		<Button disabled={!newQuestion || isLoading} on:click={submitQuestions}>
			{#if isLoading}
				Asking...
			{:else}
				Ask
			{/if}</Button
		>
	</Dialog.Content>
</Dialog.Root>
