import React, { useState, useEffect } from 'react';
import Header from '../components/Header'; // Assurez-vous que le chemin est correct
import '../App.css';
import { useNavigate } from 'react-router-dom';
import AppHeader from '../components/AppHeader';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

// Type pour une propriété
interface Property {
  id: number;
  image: string;
  isFeatured: boolean;
  isEcoFriendly: boolean;
  price: string;
  isContributed: boolean;
  title: string;
  address: string;
  priceValue: number; // Valeur numérique pour le prix
  convertedPrice: string;
  remainingInvestors: number;
  totalInvestors: number;
  profitability: string;
  returnRate: string;
}

const PropertiesPage: React.FC = () => {
  const navigate = useNavigate();
  const [balance, setBalance] = useState(0);
  const [xp, setXp] = useState(8);
  const [activeTab, setActiveTab] = useState('Properties');
  const avatarUrl = undefined;
  const token = useSelector((state: RootState) => state.auth.token);

  // Données de propriétés simulées
  const [properties, setProperties] = useState<Property[]>([
    {
      id: 1,
      image: 'https://placehold.co/400x300/e6e6e6/000?text=Property',
      isFeatured: true,
      isEcoFriendly: true,
      price: '12$ & 0.2%',
      isContributed: false,
      title: 'Standpoint Tower A Downtown',
      address: 'Orange street, United Kingdom S012',
      priceValue: 143,
      convertedPrice: 'Converted to: 1500 Tannit',
      remainingInvestors: 40,
      totalInvestors: 72,
      profitability: '10,35%',
      returnRate: '4,6%',
    },
    {
      id: 2,
      image: 'https://placehold.co/400x300/e6e6e6/000?text=Property',
      isFeatured: true,
      isEcoFriendly: false,
      price: '12$ & 0.2%',
      isContributed: true,
      title: 'Standpoint Tower A Downtown',
      address: 'Orange street, United Kingdom S012',
      priceValue: 143,
      convertedPrice: 'Converted to: 1500 Tannit',
      remainingInvestors: 40,
      totalInvestors: 72,
      profitability: '10,35%',
      returnRate: '4,6%',
    },
    {
      id: 3,
      image: 'https://placehold.co/400x300/e6e6e6/000?text=Property',
      isFeatured: true,
      isEcoFriendly: false,
      price: '12$ & 0.2%',
      isContributed: false,
      title: 'Standpoint Tower A Downtown',
      address: 'Orange street, United Kingdom S012',
      priceValue: 143,
      convertedPrice: 'Converted to: 1500 Tannit',
      remainingInvestors: 40,
      totalInvestors: 72,
      profitability: '10,35%',
      returnRate: '4,6%',
    },
    {
      id: 4,
      image: 'https://placehold.co/400x300/e6e6e6/000?text=Property',
      isFeatured: true,
      isEcoFriendly: false,
      price: '12$ & 0.2%',
      isContributed: false,
      title: 'Standpoint Tower A Downtown',
      address: 'Orange street, United Kingdom S012',
      priceValue: 143,
      convertedPrice: 'Converted to: 1500 Tannit',
      remainingInvestors: 40,
      totalInvestors: 72,
      profitability: '10,35%',
      returnRate: '4,6%',
    },
    {
      id: 5,
      image: 'https://placehold.co/400x300/e6e6e6/000?text=Property',
      isFeatured: true,
      isEcoFriendly: false,
      price: '12$ & 0.2%',
      isContributed: true,
      title: 'Standpoint Tower A Downtown',
      address: 'Orange street, United Kingdom S012',
      priceValue: 143,
      convertedPrice: 'Converted to: 1500 Tannit',
      remainingInvestors: 40,
      totalInvestors: 72,
      profitability: '10,35%',
      returnRate: '4,6%',
    },
    {
      id: 6,
      image: 'https://placehold.co/400x300/e6e6e6/000?text=Property',
      isFeatured: true,
      isEcoFriendly: false,
      price: '12$ & 0.2%',
      isContributed: false,
      title: 'Standpoint Tower A Downtown',
      address: 'Orange street, United Kingdom S012',
      priceValue: 143,
      convertedPrice: 'Converted to: 1500 Tannit',
      remainingInvestors: 40,
      totalInvestors: 72,
      profitability: '10,35%',
      returnRate: '4,6%',
    },
  ]);

  const PropertyCard: React.FC<{ property: Property }> = ({ property }) => (
    <div className="property-card">
      <div className="property-image-container">
        <img src={property.image} alt={property.title} className="property-image" />
        <div className="property-badges">
          {property.isFeatured && (
            <span className="badge featured-badge">
              <span className="star-icon">★</span>Featured
            </span>
          )}
          {property.isEcoFriendly && (
            <span className="badge eco-friendly-badge">Eco Friendly</span>
          )}
        </div>
      </div>
      <div className="property-details">
        {property.isContributed && (
          <div className="contributed-badge">Contributed</div>
        )}
        <h4 className="property-title">{property.title}</h4>
        <div className="property-address">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-map-pin">
            <path d="M12 21.7C17.3 17 22 12.7 22 9s-4.7-9-10-9S2 5.7 2 9s4.7 8 10 12.7c0.2 0.2 0.5 0.3 0.8 0.3s0.5-0.1 0.8-0.3z" />
            <circle cx="12" cy="9" r="3" />
          </svg>
          <span>{property.address}</span>
        </div>
        <div className="property-icons">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-bed">
            <path d="M2 20v-5h10V5h-6l-2-2v5H2z" />
            <path d="M22 17H12" />
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-bath">
            <path d="M12 21a9 9 0 0 1-9-9V3h18v9a9 9 0 0 1-9 9z" />
            <path d="M12 21a9 9 0 0 1-9-9" />
            <path d="M12 3v18" />
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-car">
            <path d="M18 10a2 2 0 1 1-4 0 2 2 0 0 1 4 0z" />
            <path d="M21 2h-4a2 2 0 0 0-2 2v6h6V4a2 2 0 0 0-2-2z" />
            <path d="M15 10a2 2 0 1 1-4 0 2 2 0 0 1 4 0z" />
            <path d="M8 10a2 2 0 1 1-4 0 2 2 0 0 1 4 0z" />
            <path d="M2 12h20" />
            <path d="M12 12v6h-6v-6" />
            <path d="M2 18h20" />
            <path d="M12 12h6" />
          </svg>
        </div>
        <div className="property-price">
          <span className="price-value">{property.priceValue}K £</span>
          <span className="price-converted">{property.convertedPrice}</span>
        </div>
        <div className="investor-info">
          <div className="investor-stat">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-users">
              <path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M6 18.5a4 4 0 0 1-3.19-2.52" />
            </svg>
            <span>{property.remainingInvestors} remaining</span>
          </div>
          <div className="investor-stat">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user-check">
              <path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
              <path d="m19 19 2 2-2 2" />
            </svg>
            <span>{property.totalInvestors} Investors</span>
          </div>
        </div>
      </div>
      <div className="property-returns">
        <div className="return-item">
          <span>Profitability</span>
          <strong>{property.profitability}</strong>
        </div>
        <div className="return-item">
          <span>Return</span>
          <strong>{property.returnRate}</strong>
        </div>
      </div>
    </div>
  );

  return (
    <div className="app-container properties-page">
      {/* En-tête de la page */}

      <div className="properties-container">
        {/* Onglets des propriétés */}
        <div className="properties-tabs">
          <div className={`properties-tab ${activeTab === 'Properties' ? 'active' : ''}`} onClick={() => setActiveTab('Properties')}>
            Properties (150)
          </div>
          <div className={`properties-tab ${activeTab === 'My investments' ? 'active' : ''}`} onClick={() => setActiveTab('My investments')}>
            My investments (0)
          </div>
        </div>

        {/* Barre de filtres et de recherche */}
        <div className="filter-bar">
          <div className="filter-group">
            <label className="filter-label">Price range</label>
            <select className="filter-select">
              <option>...</option>
            </select>
          </div>
          <div className="filter-group">
            <label className="filter-label">Type</label>
            <select className="filter-select">
              <option>...</option>
            </select>
          </div>
          <div className="filter-group">
            <label className="filter-label">Region</label>
            <select className="filter-select">
              <option>...</option>
            </select>
          </div>
          <div className="filter-group">
            <label className="filter-label">Energy</label>
            <select className="filter-select">
              <option>...</option>
            </select>
          </div>
          <button className="advanced-filter-button">Advanced filter</button>
          <div className="search-bar-container">
            <input type="text" placeholder="Search for property" className="search-input" />
            <button className="search-button">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </button>
          </div>
        </div>

        {/* Filtres appliqués */}
        <div className="applied-filters-bar">
          <span className="applied-filter">Applied filter:</span>
          <span className="filter-tag">United Kingdom <span className="remove-filter">×</span></span>
          <span className="filter-tag">Price: 12K - 320 € <span className="remove-filter">×</span></span>
          <span className="filter-tag">Price: 12K - 320 € <span className="remove-filter">×</span></span>
        </div>

        {/* Résultats et tri */}
        <div className="results-info-bar">
          <p>Showing 115 property that match your search criteria</p>
          <div className="sort-by">
            <label>Sort by</label>
            <select>
              <option>Recently added</option>
            </select>
          </div>
        </div>

        {/* Liste des propriétés */}
        <div className="properties-grid">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>

        {/* Bouton "Show more" */}
        <div className="show-more-container">
          <button className="show-more-button">Show more</button>
        </div>
      </div>
    </div>
  );
};

export default PropertiesPage;