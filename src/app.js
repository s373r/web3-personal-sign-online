async function main() {
    await window.ethereum.enable();

    let account;

    [account] = await window.ethereum.request({ method: 'eth_requestAccounts' });

    console.log(account);

    window.ethereum.on('accountsChanged', (accounts) => {
        [account] = accounts;
    });

    const signButton = document.getElementById('sign-button');
    const dataInput = document.getElementById('data-input');

    signButton.onclick = async () => {
        const data = dataInput.value.trim();

        if (!data) {
            alert('Empty data!');

            return;
        }

        const hexData = `0x${Buffer.from(data, 'utf8').toString('hex')}`;

        console.log('--- --- --- --- ---')
        console.log('     data', data);
        console.log('  hexData', hexData);

        const signature = await window.ethereum.request({
            method: 'personal_sign',
            params: [hexData, account],
        });

        console.log('account', account)
        console.log('signature', signature);

        alert(`Input:\n${data}\n\nAccount:\n${account}\n\nSignature:\n${signature}\n\nCheck console logs if you cannot copy values`);
    };
}

main();
