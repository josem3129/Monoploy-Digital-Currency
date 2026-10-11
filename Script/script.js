        import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
        import { getAuth, signInAnonymously, signInWithCustomToken } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
        import { getFirestore, doc, setDoc, getDoc, onSnapshot, updateDoc } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

        // Standard Monopoly Property Board Data
        const MONOPOLY_PROPERTIES = [
            { id: 'mediterranean', name: 'Mediterranean Ave', group: 'brown', price: 60, mortgage: 30, houseCost: 50, rent: 2, rent1: 10, rent2: 30, rent3: 90, rent4: 160, hotel: 250 },
            { id: 'baltic', name: 'Baltic Ave', group: 'brown', price: 60, mortgage: 30, houseCost: 50, rent: 4, rent1: 20, rent2: 60, rent3: 180, rent4: 320, hotel: 450 },
            { id: 'reading_rr', name: 'Reading Railroad', group: 'railroad', price: 200, mortgage: 100, rent: 25 },
            { id: 'oriental', name: 'Oriental Ave', group: 'lightblue', price: 100, mortgage: 50, houseCost: 50, rent: 6, rent1: 30, rent2: 90, rent3: 270, rent4: 400, hotel: 550 },
            { id: 'vermont', name: 'Vermont Ave', group: 'lightblue', price: 100, mortgage: 50, houseCost: 50, rent: 6, rent1: 30, rent2: 90, rent3: 270, rent4: 400, hotel: 550 },
            { id: 'connecticut', name: 'Connecticut Ave', group: 'lightblue', price: 120, mortgage: 60, houseCost: 50, rent: 8, rent1: 40, rent2: 100, rent3: 300, rent4: 450, hotel: 600 },
            { id: 'st_charles', name: 'St. Charles Place', group: 'pink', price: 140, mortgage: 70, houseCost: 100, rent: 10, rent1: 50, rent2: 150, rent3: 450, rent4: 625, hotel: 750 },
            { id: 'electric_co', name: 'Electric Company', group: 'utility', price: 150, mortgage: 75 },
            { id: 'states', name: 'States Ave', group: 'pink', price: 140, mortgage: 70, houseCost: 100, rent: 10, rent1: 50, rent2: 150, rent3: 450, rent4: 625, hotel: 750 },
            { id: 'virginia', name: 'Virginia Ave', group: 'pink', price: 160, mortgage: 80, houseCost: 100, rent: 12, rent1: 60, rent2: 180, rent3: 500, rent4: 700, hotel: 900 },
            { id: 'pennsylvania_rr', name: 'Pennsylvania Railroad', group: 'railroad', price: 200, mortgage: 100, rent: 25 },
            { id: 'st_james', name: 'St. James Place', group: 'orange', price: 180, mortgage: 90, houseCost: 100, rent: 14, rent1: 70, rent2: 200, rent3: 550, rent4: 750, hotel: 950 },
            { id: 'tennessee', name: 'Tennessee Ave', group: 'orange', price: 180, mortgage: 90, houseCost: 100, rent: 14, rent1: 70, rent2: 200, rent3: 550, rent4: 750, hotel: 950 },
            { id: 'new_york', name: 'New York Ave', group: 'orange', price: 200, mortgage: 100, houseCost: 100, rent: 16, rent1: 80, rent2: 220, rent3: 600, rent4: 800, hotel: 1000 },
            { id: 'kentucky', name: 'Kentucky Ave', group: 'red', price: 220, mortgage: 110, houseCost: 150, rent: 18, rent1: 90, rent2: 250, rent3: 700, rent4: 875, hotel: 1050 },
            { id: 'indiana', name: 'Indiana Ave', group: 'red', price: 220, mortgage: 110, houseCost: 150, rent: 18, rent1: 90, rent2: 250, rent3: 700, rent4: 875, hotel: 1050 },
            { id: 'illinois', name: 'Illinois Ave', group: 'red', price: 240, mortgage: 120, houseCost: 150, rent: 20, rent1: 100, rent2: 300, rent3: 750, rent4: 925, hotel: 1100 },
            { id: 'b_and_o_rr', name: 'B. & O. Railroad', group: 'railroad', price: 200, mortgage: 100, rent: 25 },
            { id: 'atlantic', name: 'Atlantic Ave', group: 'yellow', price: 260, mortgage: 130, houseCost: 150, rent: 22, rent1: 110, rent2: 330, rent3: 800, rent4: 975, hotel: 1150 },
            { id: 'ventnor', name: 'Ventnor Ave', group: 'yellow', price: 260, mortgage: 130, houseCost: 150, rent: 22, rent1: 110, rent2: 330, rent3: 800, rent4: 975, hotel: 1150 },
            { id: 'water_works', name: 'Water Works', group: 'utility', price: 150, mortgage: 75 },
            { id: 'marvin', name: 'Marvin Gardens', group: 'yellow', price: 280, mortgage: 140, houseCost: 150, rent: 24, rent1: 120, rent2: 360, rent3: 850, rent4: 1025, hotel: 1200 },
            { id: 'pacific', name: 'Pacific Ave', group: 'green', price: 300, mortgage: 150, houseCost: 200, rent: 26, rent1: 130, rent2: 390, rent3: 900, rent4: 1100, hotel: 1275 },
            { id: 'north_carolina', name: 'North Carolina Ave', group: 'green', price: 300, mortgage: 150, houseCost: 200, rent: 26, rent1: 130, rent2: 390, rent3: 900, rent4: 1100, hotel: 1275 },
            { id: 'pennsylvania_ave', name: 'Pennsylvania Ave', group: 'green', price: 320, mortgage: 160, houseCost: 200, rent: 28, rent1: 150, rent2: 450, rent3: 1000, rent4: 1200, hotel: 1400 },
            { id: 'short_line', name: 'Short Line RR', group: 'railroad', price: 200, mortgage: 100, rent: 25 },
            { id: 'park_place', name: 'Park Place', group: 'darkblue', price: 350, mortgage: 175, houseCost: 200, rent: 35, rent1: 175, rent2: 500, rent3: 1100, rent4: 1300, hotel: 1500 },
            { id: 'boardwalk', name: 'Boardwalk', group: 'darkblue', price: 400, mortgage: 200, houseCost: 200, rent: 50, rent1: 200, rent2: 600, rent3: 1400, rent4: 1700, hotel: 2000 }
        ];

        class MonopolyApp {
            constructor() {
                this.appId = typeof __app_id !== 'undefined' ? __app_id : 'monopoly-family-game';
                this.firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : null;
                this.auth = null;
                this.db = null;
                this.unsubscribe = null;
                
                this.roomCode = localStorage.getItem('monopoly_room_code') || null;
                this.myNickname = localStorage.getItem('monopoly_nickname') || '';
                
                this.gameState = {
                    players: {},
                    properties: {}, // { propId: { owner: playerId, houses: 0, isMortgaged: false } }
                    bankReserve: 15820,
                    logs: []
                };

                // Initialize default properties state
                MONOPOLY_PROPERTIES.forEach(p => {
                    this.gameState.properties[p.id] = { owner: 'bank', houses: 0, isMortgaged: false };
                });

                this.initFirebase();
                this.initUI();
            }

            async initFirebase() {
                try {
                    let config = this.firebaseConfig;
                    const savedConfig = localStorage.getItem('monopoly_firebase_config');
                    if (savedConfig) {
                        try { config = JSON.parse(savedConfig); } catch (e) {}
                    }

                    if (config && config.apiKey) {
                        const app = initializeApp(config);
                        this.auth = getAuth(app);
                        this.db = getFirestore(app);

                        if (typeof __initial_auth_token !== 'undefined' && __initial_auth_token) {
                            await signInWithCustomToken(this.auth, __initial_auth_token);
                        } else {
                            await signInAnonymously(this.auth);
                        }
                        console.log("Firebase initialized successfully.");
                    } else {
                        console.log("Running in local memory mode (Firebase config not provided).");
                    }
                } catch (e) {
                    console.error("Firebase init error:", e);
                }

                if (this.roomCode) {
                    document.getElementById('join-room-code').value = this.roomCode;
                    if (this.myNickname) {
                        document.getElementById('player-nickname').value = this.myNickname;
                    }
                }
            }

            initUI() {
                if (this.myNickname) {
                    const nickInput = document.getElementById('player-nickname');
                    if (nickInput) nickInput.value = this.myNickname;
                }
            }

            async createRoom() {
                const nickname = document.getElementById('player-nickname').value.trim();
                if (!nickname) {
                    this.showToast('Please enter your player nickname first!', 'error');
                    return;
                }
                this.myNickname = nickname;
                localStorage.setItem('monopoly_nickname', nickname);

                // Generate random 4-letter room code
                const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
                let code = '';
                for (let i = 0; i < 4; i++) {
                    code += chars.charAt(Math.floor(Math.random() * chars.length));
                }
                this.roomCode = code;
                localStorage.setItem('monopoly_room_code', code);

                const playerId = 'player_' + Math.random().toString(36).substring(2, 9);
                
                this.gameState.players[playerId] = {
                    id: playerId,
                    name: nickname,
                    cash: 1500,
                    token: 'fa-hat-cowboy',
                    isBankrupt: false
                };

                this.logActivity(`Room ${code} created by ${nickname}`);
                await this.syncToCloud(true);
                this.enterRoomView();
            }

            async joinRoom() {
                const code = document.getElementById('join-room-code').value.trim().toUpperCase();
                const nickname = document.getElementById('player-nickname').value.trim();
                if (!code || code.length < 4) {
                    this.showToast('Please enter a valid room code.', 'error');
                    return;
                }
                if (!nickname) {
                    this.showToast('Please enter your player nickname.', 'error');
                    return;
                }
                this.roomCode = code;
                this.myNickname = nickname;
                localStorage.setItem('monopoly_room_code', code);
                localStorage.setItem('monopoly_nickname', nickname);

                if (this.db) {
                    const docRef = doc(this.db, 'artifacts', this.appId, 'public', 'data', `room_${code}`);
                    const snap = await getDoc(docRef);
                    if (snap.exists()) {
                        const data = snap.data();
                        this.gameState = data.state || this.gameState;
                        
                        // Check if player already exists, else add
                        const existingPlayer = Object.values(this.gameState.players).find(p => p.name.toLowerCase() === nickname.toLowerCase());
                        if (!existingPlayer) {
                            const playerId = 'player_' + Math.random().toString(36).substring(2, 9);
                            this.gameState.players[playerId] = {
                                id: playerId,
                                name: nickname,
                                cash: 1500,
                                token: 'fa-car',
                                isBankrupt: false
                            };
                            this.logActivity(`${nickname} joined the game.`);
                            await this.syncToCloud(true);
                        }
                    } else {
                        this.showToast('Room not found! Check code or create new.', 'error');
                        return;
                    }
                } else {
                    // Local mode fallback
                    const playerId = 'player_' + Math.random().toString(36).substring(2, 9);
                    this.gameState.players[playerId] = {
                        id: playerId,
                        name: nickname,
                        cash: 1500,
                        token: 'fa-dog',
                        isBankrupt: false
                    };
                }

                this.enterRoomView();
            }

            enterRoomView() {
                document.getElementById('view-lobby').classList.add('hidden');
                document.getElementById('view-dashboard').classList.remove('hidden');
                document.getElementById('room-badge').classList.remove('hidden');
                document.getElementById('current-room-code').innerText = this.roomCode;
                document.getElementById('leave-room-btn').classList.remove('hidden');

                if (this.db) {
                    this.subscribeToRoom();
                }

                this.render();
            }

            leaveRoom() {
                if (this.unsubscribe) this.unsubscribe();
                localStorage.removeItem('monopoly_room_code');
                this.roomCode = null;
                document.getElementById('view-dashboard').classList.add('hidden');
                document.getElementById('room-badge').classList.add('hidden');
                document.getElementById('leave-room-btn').classList.add('hidden');
                document.getElementById('view-lobby').classList.remove('hidden');
                this.showToast('Left game room.', 'info');
            }

            subscribeToRoom() {
                if (!this.db || !this.roomCode) return;
                const docRef = doc(this.db, 'artifacts', this.appId, 'public', 'data', `room_${this.roomCode}`);
                this.unsubscribe = onSnapshot(docRef, (docSnap) => {
                    if (docSnap.exists()) {
                        const data = docSnap.data();
                        if (data && data.state) {
                            this.gameState = data.state;
                            this.render();
                        }
                    }
                }, (error) => {
                    console.error("Firestore sync error:", error);
                });
            }

            async syncToCloud(force = false) {
                if (!this.db || !this.roomCode) return;
                try {
                    const docRef = doc(this.db, 'artifacts', this.appId, 'public', 'data', `room_${this.roomCode}`);
                    await setDoc(docRef, { state: this.gameState, updatedAt: new Date().toISOString() });
                } catch (e) {
                    console.error("Error saving to cloud:", e);
                }
            }

            logActivity(message) {
                const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                this.gameState.logs.unshift({ time, message });
                if (this.gameState.logs.length > 50) this.gameState.logs.pop();
            }

            render() {
                // Bank reserve
                document.getElementById('bank-reserve').innerText = '$' + this.formatMoney(this.gameState.bankReserve);

                // Render Players
                const playersContainer = document.getElementById('players-container');
                playersContainer.innerHTML = '';

                const playersList = Object.values(this.gameState.players);
                if (playersList.length === 0) {
                    playersContainer.innerHTML = `<div class="col-span-2 text-center py-8 text-slate-400 text-sm">No players added yet. Click Add Player above.</div>`;
                }

                playersList.forEach(player => {
                    // Calculate net worth (cash + property purchase value + houses)
                    let propValue = 0;
                    Object.entries(this.gameState.properties).forEach(([pid, pdata]) => {
                        if (pdata.owner === player.id) {
                            const def = MONOPOLY_PROPERTIES.find(p => p.id === pid);
                            if (def) {
                                propValue += def.price;
                                if (pdata.houses && pdata.houses > 0 && def.houseCost) {
                                    propValue += pdata.houses * def.houseCost;
                                }
                            }
                        }
                    });
                    const netWorth = player.cash + propValue;

                    const card = document.createElement('div');
                    card.className = `glass-panel p-4 rounded-2xl border ${player.isBankrupt ? 'border-rose-500/50 bg-rose-50/50 dark:bg-rose-950/20 opacity-60' : 'border-slate-200 dark:border-slate-800'} shadow-sm flex flex-col justify-between`;
                    
                    card.innerHTML = `
                        <div>
                            <div class="flex items-center justify-between mb-3">
                                <div class="flex items-center gap-2.5">
                                    <div class="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
                                        <i class="fa-solid ${player.token || 'fa-user'}"></i>
                                    </div>
                                    <div>
                                        <h4 class="font-bold text-sm flex items-center gap-1.5">
                                            ${player.name}
                                            ${player.name.toLowerCase() === this.myNickname.toLowerCase() ? '<span class="text-[10px] bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 px-1.5 py-0.5 rounded-full font-semibold">You</span>' : ''}
                                        </h4>
                                        <p class="text-[11px] text-slate-400">Net Worth: $<span class="font-semibold text-slate-600 dark:text-slate-300">${this.formatMoney(netWorth)}</span></p>
                                    </div>
                                </div>
                                <button onclick="app.openPlayerDetail('${player.id}')" class="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-600 dark:text-slate-300 transition text-xs" title="Manage Player">
                                    <i class="fa-solid fa-gear"></i>
                                </button>
                            </div>
                            <div class="my-3">
                                <span class="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Cash Balance</span>
                                <div class="text-2xl font-black text-emerald-600 dark:text-emerald-400">$${this.formatMoney(player.cash)}</div>
                            </div>
                        </div>
                        <div class="pt-3 border-t border-slate-200 dark:border-slate-800/80 flex gap-2">
                            <button onclick="app.quickPayPlayer('${player.id}')" class="flex-1 py-1.5 bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 text-emerald-700 dark:text-emerald-300 text-xs font-semibold rounded-lg transition border border-emerald-200 dark:border-emerald-900/50">
                                Pay
                            </button>
                            <button onclick="app.quickCollectPlayer('${player.id}')" class="flex-1 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 text-xs font-semibold rounded-lg transition">
                                Charge Rent
                            </button>
                        </div>
                    `;
                    playersContainer.appendChild(card);
                });

                // Render Property Summary List
                const propSummaryList = document.getElementById('property-summary-list');
                propSummaryList.innerHTML = '';
                MONOPOLY_PROPERTIES.slice(0, 8).forEach(prop => {
                    const pState = this.gameState.properties[prop.id] || { owner: 'bank', houses: 0, isMortgaged: false };
                    let ownerName = 'Bank (Available)';
                    let ownerBadgeColor = 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300';

                    if (pState.owner !== 'bank') {
                        const ownerObj = this.gameState.players[pState.owner];
                        ownerName = ownerObj ? ownerObj.name : 'Unknown';
                        ownerBadgeColor = 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300';
                    }

                    const item = document.createElement('div');
                    item.className = 'p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs';
                    item.innerHTML = `
                        <div>
                            <div class="font-bold">${prop.name}</div>
                            <div class="text-[10px] text-slate-400">$${prop.price} ${pState.houses > 0 ? `• ${pState.houses} House(s)` : ''} ${pState.isMortgaged ? '• <span class="text-rose-500 font-bold">Mortgaged</span>' : ''}</div>
                        </div>
                        <span class="px-2 py-0.5 rounded-full font-medium ${ownerBadgeColor}">${ownerName}</span>
                    `;
                    propSummaryList.appendChild(item);
                });

                // Render Activity Log
                const logContainer = document.getElementById('activity-log-container');
                logContainer.innerHTML = '';
                if (this.gameState.logs.length === 0) {
                    logContainer.innerHTML = `<div class="text-center py-6 text-slate-400 text-xs">No transactions yet.</div>`;
                }
                this.gameState.logs.forEach(log => {
                    const row = document.createElement('div');
                    row.className = 'p-2 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800/80 flex items-start gap-2';
                    row.innerHTML = `
                        <span class="text-[10px] text-slate-400 font-mono mt-0.5">${log.time}</span>
                        <div class="flex-1 text-slate-700 dark:text-slate-300">${log.message}</div>
                    `;
                    logContainer.appendChild(row);
                });

                // Update Select Dropdowns across modals
                this.updateDropdowns();
            }

            updateDropdowns() {
                const playersList = Object.values(this.gameState.players).filter(p => !p.isBankrupt);
                const allPlayersWithBank = [{ id: 'bank', name: 'The Bank' }, ...playersList];

                // Transfer Modal Dropdowns
                const fromSelect = document.getElementById('transfer-from');
                const toSelect = document.getElementById('transfer-to');
                if (fromSelect && toSelect) {
                    const curFrom = fromSelect.value;
                    const curTo = toSelect.value;
                    fromSelect.innerHTML = '';
                    toSelect.innerHTML = '';

                    allPlayersWithBank.forEach(p => {
                        fromSelect.add(new Option(p.name, p.id));
                        toSelect.add(new Option(p.name, p.id));
                    });
                    if (curFrom) fromSelect.value = curFrom;
                    if (curTo) toSelect.value = curTo;
                }

                // Buy Property Modal Dropdowns
                const buyPlayerSelect = document.getElementById('buy-player-select');
                const buyPropSelect = document.getElementById('buy-property-select');
                if (buyPlayerSelect && buyPropSelect) {
                    buyPlayerSelect.innerHTML = '';
                    playersList.forEach(p => buyPlayerSelect.add(new Option(p.name, p.id)));

                    buyPropSelect.innerHTML = '';
                    MONOPOLY_PROPERTIES.forEach(prop => {
                        const pState = this.gameState.properties[prop.id];
                        if (pState && pState.owner === 'bank') {
                            buyPropSelect.add(new Option(`${prop.name} ($${prop.price})`, prop.id));
                        }
                    });
                }

                // Bank Modal Dropdown
                const bankPlayerSelect = document.getElementById('bank-player-select');
                if (bankPlayerSelect) {
                    bankPlayerSelect.innerHTML = '';
                    playersList.forEach(p => bankPlayerSelect.add(new Option(p.name, p.id)));
                }

                // Auction Modal Dropdowns
                const auctionPropSelect = document.getElementById('auction-property-select');
                const auctionBidderSelect = document.getElementById('auction-bidder-select');
                if (auctionPropSelect && auctionBidderSelect) {
                    auctionPropSelect.innerHTML = '';
                    MONOPOLY_PROPERTIES.forEach(prop => {
                        const pState = this.gameState.properties[prop.id];
                        if (pState && pState.owner === 'bank') {
                            auctionPropSelect.add(new Option(`${prop.name} (Value: $${prop.price})`, prop.id));
                        }
                    });

                    auctionBidderSelect.innerHTML = '';
                    playersList.forEach(p => auctionBidderSelect.add(new Option(p.name, p.id)));
                }
            }

            formatMoney(amount) {
                return amount.toLocaleString();
            }

            showToast(message, type = 'success') {
                const container = document.getElementById('toast-container');
                const toast = document.createElement('div');
                const bg = type === 'error' ? 'bg-rose-600 text-white' : 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900';
                toast.className = `pointer-events-auto px-4 py-3 rounded-xl shadow-xl text-xs font-semibold flex items-center gap-2 transition-all transform translate-y-2 opacity-0 ${bg}`;
                toast.innerHTML = `<i class="fa-solid ${type === 'error' ? 'fa-circle-exclamation text-rose-200' : 'fa-circle-check text-emerald-400'}"></i> ${message}`;
                container.appendChild(toast);
                
                setTimeout(() => {
                    toast.classList.remove('translate-y-2', 'opacity-0');
                }, 10);

                setTimeout(() => {
                    toast.classList.add('translate-y-2', 'opacity-0');
                    setTimeout(() => toast.remove(), 300);
                }, 3500);
            }

            openModal(modalId) {
                document.getElementById(modalId).classList.remove('hidden');
                document.getElementById(modalId).classList.add('flex');
                this.updateDropdowns();
            }

            closeModal(modalId) {
                document.getElementById(modalId).classList.remove('flex');
                document.getElementById(modalId).classList.add('hidden');
            }

            openSettingsModal() {
                const configInput = document.getElementById('firebase-config-input');
                if (this.firebaseConfig) {
                    configInput.value = JSON.stringify(this.firebaseConfig, null, 2);
                }
                this.openModal('modal-settings');
            }

            saveFirebaseConfig() {
                const val = document.getElementById('firebase-config-input').value.trim();
                try {
                    const parsed = JSON.parse(val);
                    localStorage.setItem('monopoly_firebase_config', JSON.stringify(parsed));
                    this.firebaseConfig = parsed;
                    this.closeModal('modal-settings');
                    this.showToast('Firebase configuration saved! Re-initializing...');
                    this.initFirebase();
                } catch (e) {
                    this.showToast('Invalid JSON format. Please check your config string.', 'error');
                }
            }

            openTransferModal() { this.openModal('modal-transfer'); }
            openBuyPropertyModal() { this.openModal('modal-buy-property'); }
            openAddPlayerModal() { this.openModal('modal-add-player'); }
            openAuctionModal() { this.openModal('modal-auction'); }
            openDiceModal() {
                this.openModal('modal-dice');
            }

            openBankModal(mode) {
                const title = document.getElementById('bank-modal-title');
                const submitBtn = document.getElementById('bank-submit-btn');
                if (mode === 'collect') {
                    title.innerHTML = `<i class="fa-solid fa-arrow-down text-emerald-600"></i> Collect Money from Bank`;
                    submitBtn.innerText = 'Collect Money';
                    submitBtn.onclick = () => this.executeBankCollect();
                } else {
                    title.innerHTML = `<i class="fa-solid fa-arrow-up text-rose-600"></i> Pay Money to Bank`;
                    submitBtn.innerText = 'Pay Bank';
                    submitBtn.onclick = () => this.executeBankPay();
                }
                this.openModal('modal-bank');
            }

            async executeTransfer() {
                const fromId = document.getElementById('transfer-from').value;
                const toId = document.getElementById('transfer-to').value;
                const amount = parseInt(document.getElementById('transfer-amount').value);
                const note = document.getElementById('transfer-note').value.trim() || 'Transfer';

                if (!amount || amount <= 0) {
                    this.showToast('Please enter a valid amount.', 'error');
                    return;
                }
                if (fromId === toId) {
                    this.showToast('Sender and recipient cannot be the same.', 'error');
                    return;
                }

                let fromName = 'The Bank';
                let toName = 'The Bank';

                if (fromId !== 'bank') {
                    if (!this.gameState.players[fromId]) return;
                    if (this.gameState.players[fromId].cash < amount) {
                        this.showToast(`${this.gameState.players[fromId].name} does not have enough cash!`, 'error');
                        return;
                    }
                    this.gameState.players[fromId].cash -= amount;
                    fromName = this.gameState.players[fromId].name;
                } else {
                    if (this.gameState.bankReserve < amount) {
                        this.showToast('Bank reserve is low, but proceeding...', 'info');
                    }
                    this.gameState.bankReserve -= amount;
                }

                if (toId !== 'bank') {
                    if (!this.gameState.players[toId]) return;
                    this.gameState.players[toId].cash += amount;
                    toName = this.gameState.players[toId].name;
                } else {
                    this.gameState.bankReserve += amount;
                }

                this.logActivity(`Transfer: <b>${fromName}</b> paid <b>$${this.formatMoney(amount)}</b> to <b>${toName}</b> (${note})`);
                this.closeModal('modal-transfer');
                await this.syncToCloud();
                this.render();
                this.showToast('Transfer completed successfully!');
            }

            async executeAddPlayer() {
                const name = document.getElementById('new-player-name').value.trim();
                const token = document.getElementById('new-player-token').value;
                const cash = parseInt(document.getElementById('new-player-cash').value) || 1500;

                if (!name) {
                    this.showToast('Please enter a player name.', 'error');
                    return;
                }

                const playerId = 'player_' + Math.random().toString(36).substring(2, 9);
                this.gameState.players[playerId] = {
                    id: playerId,
                    name,
                    cash,
                    token,
                    isBankrupt: false
                };

                this.logActivity(`${name} joined the game with $${this.formatMoney(cash)}.`);
                this.closeModal('modal-add-player');
                document.getElementById('new-player-name').value = '';
                await this.syncToCloud();
                this.render();
                this.showToast(`Added player ${name}!`);
            }

            async executeBuyProperty() {
                const playerId = document.getElementById('buy-player-select').value;
                const propId = document.getElementById('buy-property-select').value;

                const player = this.gameState.players[playerId];
                const propDef = MONOPOLY_PROPERTIES.find(p => p.id === propId);

                if (!player || !propDef) return;

                if (player.cash < propDef.price) {
                    this.showToast(`${player.name} does not have enough cash to buy ${propDef.name} ($${propDef.price})!`, 'error');
                    return;
                }

                player.cash -= propDef.price;
                this.gameState.bankReserve += propDef.price;
                this.gameState.properties[propId] = { owner: playerId, houses: 0, isMortgaged: false };

                this.logActivity(`<b>${player.name}</b> purchased <b>${propDef.name}</b> from the Bank for <b>$${propDef.price}</b>.`);
                this.closeModal('modal-buy-property');
                await this.syncToCloud();
                this.render();
                this.showToast(`${player.name} bought ${propDef.name}!`);
            }

            async executeBankCollect() {
                const playerId = document.getElementById('bank-player-select').value;
                const amount = parseInt(document.getElementById('bank-amount').value);
                const reason = document.getElementById('bank-reason').value.trim() || 'Bank collection';

                const player = this.gameState.players[playerId];
                if (!player || !amount) return;

                player.cash += amount;
                this.gameState.bankReserve -= amount;

                this.logActivity(`<b>${player.name}</b> collected <b>$${this.formatMoney(amount)}</b> from the Bank (${reason}).`);
                this.closeModal('modal-bank');
                await this.syncToCloud();
                this.render();
                this.showToast(`Collected $${this.formatMoney(amount)} for ${player.name}`);
            }

            async executeBankPay() {
                const playerId = document.getElementById('bank-player-select').value;
                const amount = parseInt(document.getElementById('bank-amount').value);
                const reason = document.getElementById('bank-reason').value.trim() || 'Bank fee/tax';

                const player = this.gameState.players[playerId];
                if (!player || !amount) return;

                player.cash -= amount;
                this.gameState.bankReserve += amount;

                this.logActivity(`<b>${player.name}</b> paid <b>$${this.formatMoney(amount)}</b> to the Bank (${reason}).`);
                this.closeModal('modal-bank');
                await this.syncToCloud();
                this.render();
                this.showToast(`Paid $${this.formatMoney(amount)} to Bank`);
            }

            async quickPayPlayer(playerId) {
                const player = this.gameState.players[playerId];
                const amountPrompt = prompt(`Pay amount to ${player.name}:`, '50');
                if (!amountPrompt) return;
                const amount = parseInt(amountPrompt);
                if (isNaN(amount) || amount <= 0) return;

                player.cash += amount;
                this.logActivity(`Bank paid <b>$${this.formatMoney(amount)}</b> to <b>${player.name}</b>.`);
                await this.syncToCloud();
                this.render();
                this.showToast(`Paid $${amount} to ${player.name}`);
            }

            async quickCollectPlayer(playerId) {
                const player = this.gameState.players[playerId];
                const amountPrompt = prompt(`Charge rent/fee from ${player.name}:`, '50');
                if (!amountPrompt) return;
                const amount = parseInt(amountPrompt);
                if (isNaN(amount) || amount <= 0) return;

                player.cash -= amount;
                this.gameState.bankReserve += amount;
                this.logActivity(`<b>${player.name}</b> paid <b>$${this.formatMoney(amount)}</b> rent/fee.`);
                await this.syncToCloud();
                this.render();
                this.showToast(`Charged $${amount} from ${player.name}`);
            }

            openPlayerDetail(playerId) {
                const player = this.gameState.players[playerId];
                if (!player) return;

                document.getElementById('detail-player-name').innerText = player.name;
                document.getElementById('detail-player-cash').innerText = '$' + this.formatMoney(player.cash);
                document.getElementById('detail-player-avatar').innerHTML = `<i class="fa-solid ${player.token || 'fa-user'}"></i>`;
                
                // Store active detail player in window scope
                window.currentDetailPlayerId = playerId;

                // Render properties owned by player
                const propListContainer = document.getElementById('detail-player-properties-list');
                propListContainer.innerHTML = '';
                
                let count = 0;
                Object.entries(this.gameState.properties).forEach(([propId, pState]) => {
                    if (pState.owner === playerId) {
                        count++;
                        const def = MONOPOLY_PROPERTIES.find(p => p.id === propId);
                        if (!def) return;

                        const item = document.createElement('div');
                        item.className = 'p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs';
                        
                        let buildingControls = '';
                        if (def.houseCost) {
                            buildingControls = `
                                <div class="flex items-center gap-1.5 mt-2">
                                    <span class="text-[10px] text-slate-400">Houses: ${pState.houses || 0}</span>
                                    <button onclick="app.modifyHouses('${propId}', -1)" class="px-2 py-0.5 bg-slate-200 dark:bg-slate-700 rounded text-[10px] font-bold">-</button>
                                    <button onclick="app.modifyHouses('${propId}', 1)" class="px-2 py-0.5 bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 rounded text-[10px] font-bold">+</button>
                                </div>
                            `;
                        }

                        item.innerHTML = `
                            <div>
                                <div class="font-bold">${def.name}</div>
                                <div class="text-[10px] text-slate-400">Value: $${def.price} ${pState.isMortgaged ? '• <span class="text-rose-500 font-bold">Mortgaged</span>' : ''}</div>
                                ${buildingControls}
                            </div>
                            <div class="flex items-center gap-2">
                                <button onclick="app.toggleMortgage('${propId}')" class="px-2.5 py-1 rounded-lg text-[10px] font-semibold ${pState.isMortgaged ? 'bg-amber-100 text-amber-800' : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200'}">
                                    ${pState.isMortgaged ? 'Unmortgage' : 'Mortgage'}
                                </button>
                                <button onclick="app.transferProperty('${propId}')" class="px-2.5 py-1 rounded-lg text-[10px] font-semibold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                                    Trade
                                </button>
                            </div>
                        `;
                        propListContainer.appendChild(item);
                    }
                });

                document.getElementById('detail-player-prop-count').innerText = `${count} properties`;
                if (count === 0) {
                    propListContainer.innerHTML = `<div class="text-center py-6 text-slate-400 text-xs">No properties owned yet.</div>`;
                }

                this.openModal('modal-player-detail');
            }

            async quickAdjustCash(amount) {
                const playerId = window.currentDetailPlayerId;
                const player = this.gameState.players[playerId];
                if (!player) return;

                player.cash += amount;
                if (amount > 0) {
                    this.gameState.bankReserve -= amount;
                    this.logActivity(`<b>${player.name}</b> received <b>$${amount}</b>.`);
                } else {
                    this.gameState.bankReserve += Math.abs(amount);
                    this.logActivity(`<b>${player.name}</b> paid <b>$${Math.abs(amount)}</b>.`);
                }

                document.getElementById('detail-player-cash').innerText = '$' + this.formatMoney(player.cash);
                await this.syncToCloud();
                this.render();
                this.showToast(`Updated cash for ${player.name}`);
            }

            async modifyHouses(propId, delta) {
                const pState = this.gameState.properties[propId];
                const def = MONOPOLY_PROPERTIES.find(p => p.id === propId);
                const player = this.gameState.players[pState.owner];
                if (!pState || !def || !player) return;

                const newHouses = (pState.houses || 0) + delta;
                if (newHouses < 0 || newHouses > 5) return;

                const cost = def.houseCost;
                if (delta > 0) {
                    if (player.cash < cost) {
                        this.showToast(`${player.name} doesn't have $${cost} for a house!`, 'error');
                        return;
                    }
                    player.cash -= cost;
                    this.gameState.bankReserve += cost;
                } else {
                    const refund = cost / 2;
                    player.cash += refund;
                    this.gameState.bankReserve -= refund;
                }

                pState.houses = newHouses;
                this.logActivity(`<b>${player.name}</b> updated <b>${def.name}</b> houses to ${newHouses}.`);
                await this.syncToCloud();
                this.render();
                this.openPlayerDetail(player.id);
                this.showToast('Updated houses successfully');
            }

            async toggleMortgage(propId) {
                const pState = this.gameState.properties[propId];
                const def = MONOPOLY_PROPERTIES.find(p => p.id === propId);
                const player = this.gameState.players[pState.owner];
                if (!pState || !def || !player) return;

                const mortgageVal = def.mortgage;
                if (!pState.isMortgaged) {
                    pState.isMortgaged = true;
                    player.cash += mortgageVal;
                    this.gameState.bankReserve -= mortgageVal;
                    this.logActivity(`<b>${player.name}</b> mortgaged <b>${def.name}</b> for <b>$${mortgageVal}</b>.`);
                } else {
                    const unmortgageCost = Math.round(mortgageVal * 1.1);
                    if (player.cash < unmortgageCost) {
                        this.showToast(`${player.name} needs $${unmortgageCost} to unmortgage!`, 'error');
                        return;
                    }
                    pState.isMortgaged = false;
                    player.cash -= unmortgageCost;
                    this.gameState.bankReserve += unmortgageCost;
                    this.logActivity(`<b>${player.name}</b> unmortgaged <b>${def.name}</b> for <b>$${unmortgageCost}</b>.`);
                }

                await this.syncToCloud();
                this.render();
                this.openPlayerDetail(player.id);
                this.showToast('Updated mortgage status');
            }

            async transferProperty(propId) {
                const pState = this.gameState.properties[propId];
                const def = MONOPOLY_PROPERTIES.find(p => p.id === propId);
                const currentOwner = this.gameState.players[pState.owner];

                const targetPlayerName = prompt(`Transfer ${def.name} from ${currentOwner.name} to which player name?`);
                if (!targetPlayerName) return;

                const targetPlayer = Object.values(this.gameState.players).find(p => p.name.toLowerCase() === targetPlayerName.toLowerCase());
                if (!targetPlayer) {
                    this.showToast('Player not found!', 'error');
                    return;
                }

                pState.owner = targetPlayer.id;
                this.logActivity(`Property <b>${def.name}</b> transferred from <b>${currentOwner.name}</b> to <b>${targetPlayer.name}</b>.`);
                await this.syncToCloud();
                this.render();
                this.closeModal('modal-player-detail');
                this.showToast(`Transferred ${def.name} to ${targetPlayer.name}`);
            }

            async bankruptPlayer() {
                const playerId = window.currentDetailPlayerId;
                const player = this.gameState.players[playerId];
                if (!player) return;

                if (!confirm(`Are you sure ${player.name} is bankrupt? All properties will return to the Bank.`)) return;

                player.isBankrupt = true;
                player.cash = 0;

                // Release properties to bank
                Object.entries(this.gameState.properties).forEach(([propId, pState]) => {
                    if (pState.owner === playerId) {
                        this.gameState.properties[propId] = { owner: 'bank', houses: 0, isMortgaged: false };
                    }
                });

                this.logActivity(`🚨 <b>${player.name}</b> declared BANKRUPTCY!`);
                this.closeModal('modal-player-detail');
                await this.syncToCloud();
                this.render();
                this.showToast(`${player.name} is bankrupt.`, 'error');
            }

            rollDice() {
                const d1 = Math.floor(Math.random() * 6) + 1;
                const d2 = Math.floor(Math.random() * 6) + 1;
                const total = d1 + d2;

                const icons = ['fa-dice-one', 'fa-dice-two', 'fa-dice-three', 'fa-dice-four', 'fa-dice-five', 'fa-dice-six'];
                document.getElementById('die-1').innerHTML = `<i class="fa-solid ${icons[d1-1]}"></i>`;
                document.getElementById('die-2').innerHTML = `<i class="fa-solid ${icons[d2-1]}"></i>`;

                const resText = document.getElementById('dice-result-text');
                if (d1 === d2) {
                    resText.innerHTML = `<span class="text-amber-500 font-bold text-base">Doubles! (${d1} & ${d2}) — Total: ${total} 🎲 Roll Again!</span>`;
                } else {
                    resText.innerHTML = `<span class="font-bold text-base">Rolled ${d1} and ${d2} — Total: ${total}</span>`;
                }
            }

            placeBid() {
                const bidderId = document.getElementById('auction-bidder-select').value;
                const amount = parseInt(document.getElementById('auction-bid-amount').value);
                const bidder = this.gameState.players[bidderId];

                if (!bidder || isNaN(amount) || amount <= 0) {
                    this.showToast('Enter a valid bid amount.', 'error');
                    return;
                }

                window.currentAuctionHighestBid = amount;
                window.currentAuctionHighestBidder = bidder;

                document.getElementById('auction-highest-bid').innerText = '$' + this.formatMoney(amount);
                document.getElementById('auction-highest-bidder').innerText = `Highest Bidder: ${bidder.name}`;
                this.showToast(`${bidder.name} bid $${amount}!`);
            }

            async finalizeAuction() {
                const propId = document.getElementById('auction-property-select').value;
                const propDef = MONOPOLY_PROPERTIES.find(p => p.id === propId);
                const bidder = window.currentAuctionHighestBidder;
                const amount = window.currentAuctionHighestBid || 0;

                if (!bidder || amount <= 0) {
                    this.showToast('No valid winning bid placed yet.', 'error');
                    return;
                }

                if (bidder.cash < amount) {
                    this.showToast(`${bidder.name} doesn't have enough cash for this bid!`, 'error');
                    return;
                }

                bidder.cash -= amount;
                this.gameState.bankReserve += amount;
                this.gameState.properties[propId] = { owner: bidder.id, houses: 0, isMortgaged: false };

                this.logActivity(`Auction: <b>${bidder.name}</b> won <b>${propDef.name}</b> for <b>$${this.formatMoney(amount)}</b>.`);
                this.closeModal('modal-auction');
                await this.syncToCloud();
                this.render();
                this.showToast(`${bidder.name} won the auction for ${propDef.name}!`);
            }

            openPropertyManagerModal() {
                this.showToast('Property Directory can be viewed directly on the sidebar.', 'info');
            }
        }

        window.app = new MonopolyApp();