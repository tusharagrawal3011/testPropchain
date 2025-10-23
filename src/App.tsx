import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { Navbar } from "./components/Layout/Navbar";
import { HomePage } from "./pages/HomePage";
import { ListingsPage } from "./pages/ListingsPage";
import { PropertyDetailPage } from "./pages/PropertyDetailPage";
import { FavoritesPage } from "./pages/FavoritesPage";
import { DashboardPage } from "./pages/DashboardPage";
import { WalletModal } from "./components/WalletModal";
import { useWallet } from "./hooks/useWallet";

const AppContent: React.FC = () => {
  const { account, error, connectWallet, disconnectWallet } = useWallet();
  const [modalOpen, setModalOpen] = useState(false);
  const [favorites, setFavorites] = useState(["1", "4"]);
  const navigate = useNavigate();

  const handleOpenWalletModal = () => setModalOpen(true);
  const handleCloseWalletModal = () => setModalOpen(false);

  const handleToggleFavorite = (propertyId: string) => {
    setFavorites((prev) =>
      prev.includes(propertyId)
        ? prev.filter((id) => id !== propertyId)
        : [...prev, propertyId]
    );
  };

  const handlePropertyClick = (propertyId: string) => {
    navigate(`/property/${propertyId}`);
  };

  return (
    <>
      <Navbar
        onConnectWallet={handleOpenWalletModal}
        walletConnected={!!account}
        account={account}
      />

      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              onToggleFavorite={handleToggleFavorite}
              onPropertyClick={handlePropertyClick}
            />
          }
        />
        <Route
          path="/listings"
          element={
            <ListingsPage
              onToggleFavorite={handleToggleFavorite}
              onPropertyClick={handlePropertyClick}
            />
          }
        />
        <Route
          path="/property/:id"
          element={<PropertyDetailPage onToggleFavorite={handleToggleFavorite} />}
        />
        <Route
          path="/favorites"
          element={
            <FavoritesPage
              favorites={favorites}
              onToggleFavorite={handleToggleFavorite}
              onPropertyClick={handlePropertyClick}
            />
          }
        />
        <Route
          path="/dashboard"
          element={
            <DashboardPage
              walletConnected={!!account}
              onConnectWallet={handleOpenWalletModal}
            />
          }
        />
      </Routes>

      <WalletModal
        isOpen={modalOpen}
        onClose={handleCloseWalletModal}
        onConnect={connectWallet}
        account={account}
        error={error}
      />
    </>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
