import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

const faqs = [
  {
    question: 'Como eu crio um novo dashboard?',
    answer:
      'Você pode criar um novo dashboard clicando no botão "Novo Dashboard" no cabeçalho ou na tela "Meus Dashboards". Isso o levará para o Editor de Dashboards.',
  },
  {
    question: 'Como eu adiciono widgets ao meu dashboard?',
    answer:
      'No Editor de Dashboards, você encontrará a Biblioteca de Widgets na barra lateral esquerda. Simplesmente arraste e solte o widget desejado da biblioteca para a área de canvas.',
  },
  {
    question: 'Posso compartilhar meu dashboard com outras pessoas?',
    answer:
      'Sim! Em cada cartão de dashboard ou na tela de visualização, você encontrará um ícone de "Compartilhar". Clicar nele fornecerá opções para compartilhar seu dashboard, como copiar um link.',
  },
  {
    question: 'Como os dados são salvos?',
    answer:
      'Para esta versão da aplicação, todos os seus dashboards e configurações são salvos localmente no seu navegador usando o LocalStorage. Nenhuma informação é enviada para um servidor externo.',
  },
]

export default function HelpPage() {
  return (
    <div className="container mx-auto py-8 px-4 max-w-screen-2xl">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight">Central de Ajuda</h1>
        <p className="text-muted-foreground mt-2">
          Encontre respostas para suas perguntas mais frequentes.
        </p>
      </div>
      <div className="max-w-3xl mx-auto">
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem value={`item-${index + 1}`} key={index}>
              <AccordionTrigger className="text-lg">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  )
}
