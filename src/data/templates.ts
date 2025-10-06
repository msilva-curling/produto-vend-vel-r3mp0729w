import { Template } from '@/types/template'

export const dashboardTemplates: Template[] = [
  {
    id: 'sales-template',
    title: 'Dashboard de Vendas',
    description:
      'Monitore suas métricas de vendas, KPIs e desempenho da equipe com este template abrangente.',
    category: 'Vendas',
    imageUrl: 'https://img.usecurling.com/p/600/400?q=sales%20analytics',
    widgets: [
      {
        type: 'SingleNumberKPI',
        title: 'Receita Total',
        dataSourceId: 'ds-1',
        config: {},
      },
      {
        type: 'SingleNumberKPI',
        title: 'Novos Clientes',
        dataSourceId: 'ds-1',
        config: {},
      },
      {
        type: 'BarChart',
        title: 'Vendas por Região',
        dataSourceId: 'ds-1',
        config: {},
      },
      {
        type: 'LineChart',
        title: 'Tendência de Vendas Mensal',
        dataSourceId: 'ds-1',
        config: {},
      },
    ],
    layout: [
      { i: '0', x: 0, y: 0, w: 3, h: 2 },
      { i: '1', x: 3, y: 0, w: 3, h: 2 },
      { i: '2', x: 0, y: 2, w: 6, h: 4 },
      { i: '3', x: 6, y: 0, w: 6, h: 6 },
    ],
  },
  {
    id: 'marketing-template',
    title: 'Dashboard de Marketing',
    description:
      'Acompanhe o desempenho de campanhas, tráfego do site e engajamento nas redes sociais.',
    category: 'Marketing',
    imageUrl: 'https://img.usecurling.com/p/600/400?q=marketing%20kpi',
    widgets: [
      {
        type: 'SingleNumberKPI',
        title: 'Visitantes do Site',
        config: {},
      },
      {
        type: 'SingleNumberKPI',
        title: 'Taxa de Conversão',
        config: {},
      },
      {
        type: 'PieChart',
        title: 'Fontes de Tráfego',
        config: {},
      },
      {
        type: 'AreaChart',
        title: 'Crescimento de Leads',
        config: {},
      },
    ],
    layout: [
      { i: '0', x: 0, y: 0, w: 4, h: 2 },
      { i: '1', x: 4, y: 0, w: 4, h: 2 },
      { i: '2', x: 8, y: 0, w: 4, h: 4 },
      { i: '3', x: 0, y: 2, w: 8, h: 4 },
    ],
  },
  {
    id: 'finance-template',
    title: 'Dashboard Financeiro',
    description:
      'Obtenha uma visão geral da saúde financeira da sua empresa, incluindo despesas, receitas e lucros.',
    category: 'Finanças',
    imageUrl: 'https://img.usecurling.com/p/600/400?q=financial%20overview',
    widgets: [
      { type: 'SingleNumberKPI', title: 'Receita', config: {} },
      { type: 'SingleNumberKPI', title: 'Despesas', config: {} },
      { type: 'SingleNumberKPI', title: 'Lucro Líquido', config: {} },
      {
        type: 'BarChart',
        title: 'Receita vs. Despesas',
        config: {},
      },
    ],
    layout: [
      { i: '0', x: 0, y: 0, w: 4, h: 2 },
      { i: '1', x: 4, y: 0, w: 4, h: 2 },
      { i: '2', x: 8, y: 0, w: 4, h: 2 },
      { i: '3', x: 0, y: 2, w: 12, h: 5 },
    ],
  },
  {
    id: 'project-management-template',
    title: 'Dashboard de Projetos',
    description:
      'Gerencie o progresso de seus projetos, acompanhe tarefas e monitore a carga de trabalho da equipe.',
    category: 'Projetos',
    imageUrl: 'https://img.usecurling.com/p/600/400?q=project%20management',
    widgets: [
      { type: 'ProgressKPI', title: 'Progresso do Projeto', config: {} },
      { type: 'SingleNumberKPI', title: 'Tarefas Concluídas', config: {} },
      { type: 'SingleNumberKPI', title: 'Tarefas Atrasadas', config: {} },
      { type: 'SimpleTable', title: 'Status das Tarefas', config: {} },
    ],
    layout: [
      { i: '0', x: 0, y: 0, w: 12, h: 2 },
      { i: '1', x: 0, y: 2, w: 6, h: 2 },
      { i: '2', x: 6, y: 2, w: 6, h: 2 },
      { i: '3', x: 0, y: 4, w: 12, h: 4 },
    ],
  },
]
