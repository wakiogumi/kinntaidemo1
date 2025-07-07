document.addEventListener('DOMContentLoaded', () => {
    // 画面要素の取得
    const screens = {
        login: document.getElementById('loginScreen'),
        subscription: document.getElementById('subscriptionScreen'),
        monthlyDoc: document.getElementById('monthlyDocScreen'),
        addressChange: document.getElementById('addressChangeScreen')
    };

    // ナビゲーションボタンの取得
    const navButtons = {
        login: document.getElementById('navLogin'),
        subscription: document.getElementById('navSubscription'),
        monthlyDoc: document.getElementById('navMonthlyDoc'),
        addressChange: document.getElementById('navAddressChange'),
        logout: document.getElementById('navLogout')
    };

    const loginButton = document.getElementById('loginButton');
    const saveSubscriptionButton = document.getElementById('saveSubscription');
    const uploadMonthlyDocButton = document.getElementById('uploadMonthlyDoc');
    const saveAddressChangeButton = document.getElementById('saveAddressChange');

    let isLoggedIn = false; // ログイン状態を管理

    // 画面表示を切り替える関数
    function showScreen(screenName) {
        for (const key in screens) {
            screens[key].classList.remove('active');
        }
        screens[screenName].classList.add('active');

        // ログイン状態によって表示するナビゲーションボタンを制御
        if (screenName === 'login') {
            navButtons.subscription.style.display = 'none';
            navButtons.monthlyDoc.style.display = 'none';
            navButtons.addressChange.style.display = 'none';
            navButtons.logout.style.display = 'none';
            navButtons.login.style.display = 'block'; // ログインボタンは常に表示
        } else {
            navButtons.subscription.style.display = 'block';
            navButtons.monthlyDoc.style.display = 'block';
            navButtons.addressChange.style.display = 'block';
            navButtons.logout.style.display = 'block';
            navButtons.login.style.display = 'none'; // ログイン中はログインボタンを非表示
        }
    }

    // 初期表示はログイン画面
    showScreen('login');

    // --- イベントリスナーの設定 ---

    // ログイン処理
    loginButton.addEventListener('click', (event) => {
        event.preventDefault(); // フォームのデフォルト送信を防止
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // ここで実際の認証ロジック（例: サーバーへのAPIリクエスト）
        // 今回は簡略化のため、簡単な条件でログイン成功とします
        if (username === 'user' && password === 'pass') {
            alert('ログイン成功！');
            isLoggedIn = true;
            showScreen('subscription'); // ログイン成功後、定期購入画面へ
        } else {
            alert('ユーザー名またはパスワードが異なります。');
        }
    });

    // ログアウト処理
    navButtons.logout.addEventListener('click', () => {
        isLoggedIn = false;
        alert('ログアウトしました。');
        showScreen('login');
    });

    // ナビゲーションボタンのクリックイベント
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
    saveSubscriptionButton.addEventListener('click', (event) => {
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

        // ここで取得したデータをサーバーに送信したり、ローカルストレージに保存したりします
        console.log('定期購入情報:', {
            purchaseDate,
            nearestStation,
            destinationStation,
            transitStation,
            commuteTime,
            monthlyFare
        });
        alert('定期購入情報を保存しました！');
    });

    // 月末書類画面の提出ボタン
    uploadMonthlyDocButton.addEventListener('click', (event) => {
        event.preventDefault();
        if (!isLoggedIn) {
            alert('ログインしてください。');
            return;
        }

        const submissionDateMonthly = document.getElementById('submissionDateMonthly').value;
        const monthlyFileUpload = document.getElementById('monthlyFileUpload').files[0]; // Fileオブジェクトを取得

        console.log('月末書類情報:', {
            submissionDateMonthly,
            monthlyFileUpload: monthlyFileUpload ? monthlyFileUpload.name : 'ファイルなし'
        });
        alert('月末書類を提出しました！');
        // 実際のアップロード処理では、FormDataを使ってファイルをサーバーに送信します
    });

    // 住所変更画面の保存ボタン
    saveAddressChangeButton.addEventListener('click', (event) => {
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
            submissionDateAddress,
            zipCode,
            newAddress,
            addressDetails,
            nearestStationAddress,
            residentMoving: residentMoving ? residentMoving.value : '未選択'
        });
        alert('住所変更情報を保存しました！');
    });
});