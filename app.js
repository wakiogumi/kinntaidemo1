document.addEventListener('DOMContentLoaded', () => {
    // --- 画面要素の取得 ---
    const screens = {
        login: document.getElementById('loginScreen'),
        subscription: document.getElementById('subscriptionScreen'),
        monthlyDoc: document.getElementById('monthlyDocScreen'),
        addressChange: document.getElementById('addressChangeScreen')
    };

    const navButtons = {
        login: document.getElementById('navLogin'),
        subscription: document.getElementById('navSubscription'),
        monthlyDoc: document.getElementById('navMonthlyDoc'),
        addressChange: document.getElementById('navAddressChange'),
        logout: document.getElementById('navLogout')
    };

    // ログインフォームと登録フォームの要素
    const loginForm = document.getElementById('loginForm');
    const registerFormContainer = document.getElementById('registerFormContainer');
    const registerForm = document.getElementById('registerForm');
    const showRegisterFormButton = document.getElementById('showRegisterFormButton');
    const hideRegisterFormButton = document.getElementById('hideRegisterFormButton');

    // --- 状態管理 ---
    let isLoggedIn = false; // ログイン状態を管理
    let currentUser = null; // 現在ログイン中のユーザー名

    // 簡易的なユーザーデータベース (本番環境ではサーバーサイドで管理！)
    // localStorageから既存のユーザー情報を読み込む
    let users = JSON.parse(localStorage.getItem('users')) || {};

    // --- ユーティリティ関数 ---

    // 画面表示を切り替える関数
    function showScreen(screenName) {
        // すべての画面を非表示に
        for (const key in screens) {
            screens[key].classList.remove('active');
        }
        // 指定された画面を表示
        screens[screenName].classList.add('active');

        // ナビゲーションボタンの表示/非表示を制御
        if (screenName === 'login') {
            navButtons.login.style.display = 'block';
            navButtons.subscription.style.display = 'none';
            navButtons.monthlyDoc.style.display = 'none';
            navButtons.addressChange.style.display = 'none';
            navButtons.logout.style.display = 'none';
        } else {
            navButtons.login.style.display = 'none';
            navButtons.subscription.style.display = 'block';
            navButtons.monthlyDoc.style.display = 'block';
            navButtons.addressChange.style.display = 'block';
            navButtons.logout.style.display = 'block';
        }
    }

    // --- イベントリスナーの設定 ---

    // 初期表示はログイン画面
    showScreen('login');

    // 新規アカウント作成フォームの表示/非表示
    showRegisterFormButton.addEventListener('click', () => {
        registerFormContainer.style.display = 'block';
        loginForm.style.display = 'none';
    });

    hideRegisterFormButton.addEventListener('click', () => {
        registerFormContainer.style.display = 'none';
        loginForm.style.display = 'block';
    });

    // 新規アカウント作成処理
    registerForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const username = document.getElementById('registerUsername').value;
        const password = document.getElementById('registerPassword').value;

        if (users[username]) {
            alert('そのユーザー名はすでに使用されています。');
            return;
        }

        // ユーザー情報を保存 (簡易的な例、本番ではパスワードはハッシュ化！)
        users[username] = { password: password };
        localStorage.setItem('users', JSON.stringify(users)); // localStorageに保存

        alert('アカウントが作成されました！ログインしてください。');
        document.getElementById('loginUsername').value = username; // 作成したユーザー名をログインフォームにセット
        document.getElementById('loginPassword').value = '';
        registerFormContainer.style.display = 'none';
        loginForm.style.display = 'block';
    });

    // ログイン処理
    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const username = document.getElementById('loginUsername').value;
        const password = document.getElementById('loginPassword').value;

        if (users[username] && users[username].password === password) {
            isLoggedIn = true;
            currentUser = username;
            alert(`ようこそ、${currentUser}さん！`);
            showScreen('subscription'); // ログイン成功後、定期購入画面へ
        } else {
            alert('ユーザー名またはパスワードが異なります。');
        }
    });

    // ログアウト処理
    navButtons.logout.addEventListener('click', () => {
        isLoggedIn = false;
        currentUser = null;
        alert('ログアウトしました。');
        showScreen('login');
    });

    // ナビゲーションボタンのクリックイベント（ログインチェックを追加）
    navButtons.subscription.addEventListener('click', () => {
        if (isLoggedIn) showScreen('subscription');
        else alert('ログインしてください。');
    });
    navButtons.monthlyDoc.addEventListener('click', () => {
        if (isLoggedIn) showScreen('monthlyDoc');
        else alert('ログインしてください。');
    });
    navButtons.addressChange.addEventListener('click', () => {
        if (isLoggedIn) showScreen('addressChange');
        else alert('ログインしてください。');
    });
    navButtons.login.addEventListener('click', () => {
        showScreen('login');
    });

    // --- 各画面のフォーム送信イベント（値の取得例） ---

    // 定期購入画面の保存ボタン
    document.getElementById('saveSubscription').addEventListener('click', (event) => {
        event.preventDefault();
        if (!isLoggedIn) {
            alert('ログインしてください。');
            return;
        }

        const purchaseDate = document.getElementById('purchaseDate').value;
        const nearestStation = document.getElementById('nearestStation').value;
        const destinationStation = document.getElementById('destinationStation').value;
        const transitStation = document.getElementById('transitStation').value;
        const commuteTime = document.getElementById('commuteTime').value;
        const monthlyFare = document.getElementById('monthlyFare').value;

        console.log('定期購入情報:', {
            currentUser,
            purchaseDate,
            nearestStation,
            destinationStation,
            transitStation,
            commuteTime,
            monthlyFare
        });
        alert('定期購入情報を保存しました！');
        // 実際のアプリでは、このデータをサーバーに送信します。
    });

    // 月末書類画面の提出ボタン
    document.getElementById('uploadMonthlyDoc').addEventListener('click', (event) => {
        event.preventDefault();
        if (!isLoggedIn) {
            alert('ログインしてください。');
            return;
        }

        const submissionDateMonthly = document.getElementById('submissionDateMonthly').value;
        const monthlyFileUpload = document.getElementById('monthlyFileUpload').files[0]; // Fileオブジェクトを取得

        console.log('月末書類情報:', {
            currentUser,
            submissionDateMonthly,
            monthlyFileUpload: monthlyFileUpload ? monthlyFileUpload.name : 'ファイルなし'
        });
        alert('月末書類を提出しました！');
        // 実際のアップロード処理では、FormDataを使ってファイルをサーバーに送信します。
    });

    // 住所変更画面の保存ボタン
    document.getElementById('saveAddressChange').addEventListener('click', (event) => {
        event.preventDefault();
        if (!isLoggedIn) {
            alert('ログインしてください。');
            return;
        }

        const submissionDateAddress = document.getElementById('submissionDateAddress').value;
        const zipCode = document.getElementById('zipCode').value;
        const newAddress = document.getElementById('newAddress').value;
        const addressDetails = document.getElementById('addressDetails').value;
        const nearestStationAddress = document.getElementById('nearestStationAddress').value;
        const residentMoving = document.querySelector('input[name="residentMoving"]:checked');

        console.log('住所変更情報:', {
            currentUser,
            submissionDateAddress,
            zipCode,
            newAddress,
            addressDetails,
            nearestStationAddress,
            residentMoving: residentMoving ? residentMoving.value : '未選択'
        });
        alert('住所変更情報を保存しました！');
        // 実際のアプリでは、このデータをサーバーに送信します。
    });
});