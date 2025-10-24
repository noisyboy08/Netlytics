import { TrendingUp, Globe, Target, AlertCircle, Lightbulb, CheckCircle } from 'lucide-react';

interface InsightCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  type: 'strength' | 'gap' | 'opportunity';
}

function InsightCard({ title, description, icon, type }: InsightCardProps) {
  const colors = {
    strength: 'bg-green-50 border-green-200',
    gap: 'bg-orange-50 border-orange-200',
    opportunity: 'bg-blue-50 border-blue-200'
  };

  const iconColors = {
    strength: 'text-green-600',
    gap: 'text-orange-600',
    opportunity: 'text-blue-600'
  };

  return (
    <div className={`${colors[type]} border rounded-lg p-4 hover:shadow-md transition-shadow`}>
      <div className="flex items-start gap-3">
        <div className={`${iconColors[type]} mt-1`}>
          {icon}
        </div>
        <div>
          <h4 className="font-semibold text-gray-900 mb-1">{title}</h4>
          <p className="text-sm text-gray-700">{description}</p>
        </div>
      </div>
    </div>
  );
}

export default function StrategicInsights() {
  const strengths = [
    {
      title: 'Diverse Global Content',
      description: 'Strong representation from US, UK, India, and South Korea demonstrates global content strategy success.',
      icon: <Globe className="w-5 h-5" />
    },
    {
      title: 'Balanced Content Mix',
      description: 'Healthy distribution between movies and TV shows provides variety for different viewing preferences.',
      icon: <CheckCircle className="w-5 h-5" />
    },
    {
      title: 'Genre Diversity',
      description: 'Wide range of genres from Drama and Comedy to Thriller and Documentaries caters to diverse audiences.',
      icon: <Target className="w-5 h-5" />
    }
  ];

  const gaps = [
    {
      title: 'Regional Content Gaps',
      description: 'Underrepresentation from emerging markets like Africa, Middle East, and Southeast Asia presents expansion opportunities.',
      icon: <AlertCircle className="w-5 h-5" />
    },
    {
      title: 'Content Age Distribution',
      description: 'Heavy focus on recent content may create gaps in classic and nostalgic content segments.',
      icon: <AlertCircle className="w-5 h-5" />
    },
    {
      title: 'Niche Genre Saturation',
      description: 'Some niche genres may be oversaturated while others remain underserved, requiring portfolio rebalancing.',
      icon: <AlertCircle className="w-5 h-5" />
    }
  ];

  const opportunities = [
    {
      title: 'Expand Regional Original Content',
      description: 'Invest in original productions from underrepresented regions to capture growing international markets.',
      icon: <TrendingUp className="w-5 h-5" />
    },
    {
      title: 'Leverage Data for Personalization',
      description: 'Use viewing patterns to create hyper-targeted content and improve recommendation algorithms.',
      icon: <Lightbulb className="w-5 h-5" />
    },
    {
      title: 'Strategic Partnerships',
      description: 'Form partnerships with local studios and creators to accelerate regional content production.',
      icon: <Target className="w-5 h-5" />
    },
    {
      title: 'Content Refresh Strategy',
      description: 'Develop a systematic approach to refresh and update library with timeless classics alongside new releases.',
      icon: <TrendingUp className="w-5 h-5" />
    }
  ];

  return (
    <div className="space-y-8">
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-3">Strategic Analysis & Recommendations</h2>
        <p className="text-gray-600">
          Based on comprehensive analysis of Netflix's content portfolio, here are key insights to inform strategic decisions
          in the competitive streaming landscape.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle className="w-6 h-6 text-green-600" />
            <h3 className="text-xl font-bold text-gray-900">Strengths</h3>
          </div>
          {strengths.map((item, index) => (
            <InsightCard key={index} {...item} type="strength" />
          ))}
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-3">
            <AlertCircle className="w-6 h-6 text-orange-600" />
            <h3 className="text-xl font-bold text-gray-900">Gaps</h3>
          </div>
          {gaps.map((item, index) => (
            <InsightCard key={index} {...item} type="gap" />
          ))}
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-3">
            <Lightbulb className="w-6 h-6 text-blue-600" />
            <h3 className="text-xl font-bold text-gray-900">Opportunities</h3>
          </div>
          {opportunities.map((item, index) => (
            <InsightCard key={index} {...item} type="opportunity" />
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-lg p-8 text-white">
        <h3 className="text-2xl font-bold mb-4">Key Recommendations</h3>
        <ul className="space-y-3">
          <li className="flex items-start gap-3">
            <span className="text-red-200 mt-1">•</span>
            <span><strong>Geographic Expansion:</strong> Prioritize content acquisition and production in high-growth markets including Southeast Asia, Latin America, and Africa.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-red-200 mt-1">•</span>
            <span><strong>Content Diversification:</strong> Balance blockbuster investments with niche content to serve diverse audience segments and reduce competitive pressure.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-red-200 mt-1">•</span>
            <span><strong>Data-Driven Strategy:</strong> Implement advanced analytics to identify content gaps and predict audience preferences before competitors.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-red-200 mt-1">•</span>
            <span><strong>Original Content Investment:</strong> Continue investing in high-quality originals that differentiate Netflix from Amazon Prime and Disney+.</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
