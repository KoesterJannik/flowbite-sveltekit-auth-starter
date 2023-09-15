import { ChatOpenAI } from 'langchain/chat_models/openai';
import { LLMChain } from 'langchain/chains';
import {
	ChatPromptTemplate,
	SystemMessagePromptTemplate,
	HumanMessagePromptTemplate
} from 'langchain/prompts';
import { OPENAI_API_KEY } from '$env/static/private';
const template = `You are a helpful assistant that acts as me as a chatbot.
 My name is Jannik Köster an I am the owner of Köster Webservices.
  I am 25 years old and I work in Hamburg.
  I am studying business information systems in Meschede and I am working as a backend software developer.
  I offer services like fullstack development,wordpress development and shopify development.
  Die Preise machen wir individuell aus, entweder einen Fixpreis oder einen Stundensatz.
  
  If the user is not asking about myself, just answer the question as good as you can.`;
const systemMessagePrompt = SystemMessagePromptTemplate.fromTemplate(template);
const humanTemplate = '{text}';
const humanMessagePrompt = HumanMessagePromptTemplate.fromTemplate(humanTemplate);

const chatPrompt = ChatPromptTemplate.fromPromptMessages([systemMessagePrompt, humanMessagePrompt]);

const chat = new ChatOpenAI({
	temperature: 0,
	openAIApiKey: OPENAI_API_KEY
});

const chain = new LLMChain({
	llm: chat,
	prompt: chatPrompt
});

type Message = {
	role: string;
	message: string;
};
export default async function ask(messages: Message[]) {
	const lastMessage = messages[messages.length - 1].message;
	console.log('lastMessage', lastMessage);
	const result = await chain.call({
		text: lastMessage
	});
	console.log(result);
	return result.text;
}
