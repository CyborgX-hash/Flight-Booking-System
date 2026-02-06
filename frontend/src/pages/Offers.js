import React, { useState } from 'react';
import './Offers.css';

const offers = [
    {
        id: 1,
        code: 'FIRST50',
        discount: '50% OFF',
        title: 'New User Special',
        description: 'Get half off on your very first booking with us. No minimum passengers.',
        validity: 'Valid for new accounts',
        color: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)'
    },
    {
        id: 2,
        code: 'PAIR20',
        discount: '20% OFF',
        title: 'Couple Getaway',
        description: 'Planning a trip for two? Save big when you fly together.',
        validity: 'Min. 2 Passengers',
        color: 'linear-gradient(135deg, #f43f5e 0%, #fae8ff 100%)'
    },
    {
        id: 3,
        code: 'SUMMER10',
        discount: '10% OFF',
        title: 'Summer Vibes',
        description: 'Beat the heat with a cool discount on all summer destinations.',
        validity: 'Valid on all flights',
        color: 'linear-gradient(135deg, #3b82f6 0%, #22d3ee 100%)'
    },
    {
        id: 4,
        code: 'FAMILY25',
        discount: '25% OFF',
        title: 'Family & Friends',
        description: 'The more the merrier! Great savings for group travel.',
        validity: 'Min. 4 Passengers',
        color: 'linear-gradient(135deg, #10b981 0%, #a7f3d0 100%)'
    }
];

const Offers = () => {
    const [copiedId, setCopiedId] = useState(null);

    const handleCopy = (id, code) => {
        navigator.clipboard.writeText(code);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    return (
        <div className="offers-page-container">
            <div className="offers-hero">
                <h1>Exclusive Offers</h1>
                <p>Unlock premium travel for less with our curated deals.</p>
            </div>

            <div className="offers-grid">
                {offers.map((offer) => (
                    <div key={offer.id} className="offer-card">
                        <div className="offer-card-header" style={{ background: offer.color }}>
                            <span className="offer-discount">{offer.discount}</span>
                        </div>
                        <div className="offer-card-body">
                            <h3>{offer.title}</h3>
                            <p>{offer.description}</p>
                            <div className="offer-meta">
                                <span className="validity-badge">{offer.validity}</span>
                            </div>

                            <div className="coupon-action-row">
                                <div className="coupon-code">{offer.code}</div>
                                <button
                                    className={`copy-btn ${copiedId === offer.id ? 'copied' : ''}`}
                                    onClick={() => handleCopy(offer.id, offer.code)}
                                >
                                    {copiedId === offer.id ? 'Copied!' : 'Copy Code'}
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Offers;
