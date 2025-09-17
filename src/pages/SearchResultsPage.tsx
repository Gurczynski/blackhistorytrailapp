import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Search, ArrowLeft, ExternalLink, Clock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import testData from "@/data/testData.json";

const SearchResultsPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [searchQuery, setSearchQuery] = useState(query);
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (query) {
      performSearch(query);
    }
  }, [query]);

  const performSearch = async (searchTerm: string) => {
    setIsLoading(true);
    
    // Search local data
    const localResults = [
      ...testData.cityHighlights,
      ...testData.services,
      ...testData.searchableContent
    ].filter(item => {
      const searchText = searchTerm.toLowerCase();
      const title = item.title?.toLowerCase() || '';
      const description = 'description' in item ? item.description?.toLowerCase() || '' : '';
      const content = 'content' in item ? item.content?.toLowerCase() || '' : '';
      
      return title.includes(searchText) || description.includes(searchText) || content.includes(searchText);
    });

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setResults(localResults);
    setIsLoading(false);
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      performSearch(searchQuery);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="mobile-header">
        <Link to="/" className="p-1">
          <ArrowLeft size={24} />
        </Link>
        <h1 className="text-lg font-bold-accent text-center flex-1">
          Search Results
        </h1>
        <div className="w-6" />
      </div>

      {/* Search Bar */}
      <div className="p-4 bg-card">
        <div className="flex space-x-2">
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search city services..."
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            className="flex-1"
          />
          <Button onClick={handleSearch} size="icon">
            <Search size={20} />
          </Button>
        </div>
      </div>

      {/* Results */}
      <div className="p-4">
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : (
          <>
            <p className="text-muted-foreground mb-4">
              {results.length} results for "{query}"
            </p>
            
            <div className="space-y-4">
              {results.map((result, index) => (
                <div key={index} className="bg-card rounded-lg p-4 border border-border">
                  <h3 className="font-semibold text-card-foreground mb-2">
                    {result.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {'description' in result ? result.description : 'content' in result ? result.content : ''}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-xs text-muted-foreground">
                      {result.date && (
                        <>
                          <Clock size={12} className="mr-1" />
                          {new Date(result.date).toLocaleDateString()}
                        </>
                      )}
                      {result.category && (
                        <span className="ml-2 px-2 py-1 bg-primary/10 text-primary rounded-full">
                          {result.category}
                        </span>
                      )}
                    </div>
                    
                    {result.url && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={result.url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink size={14} className="mr-1" />
                          View
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            {results.length === 0 && query && (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No results found for "{query}"</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Try different keywords or browse our services
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SearchResultsPage;