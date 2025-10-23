import React from "react";
import { Wallet } from "lucide-react";
import {WalletModalProps} from "../types"

export const WalletModal: React.FC<WalletModalProps> = ({
  isOpen,
  onClose,
  onConnect,
  account,
  error,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>

        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Connect Wallet
        </h2>

        {!account ? (
          <div>
            {error ? (
              <div className="p-3 text-red-600 bg-red-50 rounded-lg text-sm mb-4">
                {error}
              </div>
            ) : (
              <div className="space-y-3">
                <button
                  onClick={onConnect}
                  className="flex items-center justify-between w-full border border-gray-200 rounded-lg p-3 hover:bg-gray-50 transition"
                >
                  <div className="flex items-center space-x-3">
                    <Wallet className="w-5 h-5 text-blue-600" />
                    <span className="font-medium text-gray-800">MetaMask</span>
                  </div>
                  <span className="text-sm text-gray-500">Connect →</span>
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-6">
            <div className="text-sm text-gray-600 mb-2">
              Connected Address:
            </div>
            <div className="font-mono text-sm bg-gray-100 p-3 rounded-lg break-all">
              {account}
            </div>
            <div className="mt-4">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

