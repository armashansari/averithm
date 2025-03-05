
import Header from '@/components/Header';
import StockCalculator from '@/components/StockCalculator';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container max-w-6xl mx-auto px-4 py-8 md:py-12">
        <StockCalculator />
        
        <div className="mt-16 text-center text-sm text-muted-foreground">
          <p>
            This calculator is designed to help investors optimize their portfolio strategy. 
            Always conduct your own research before making investment decisions.
          </p>
        </div>
      </main>
    </div>
  );
};

export default Index;
