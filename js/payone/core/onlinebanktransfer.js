/**
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the GNU General Public License (GPL 3)
 * that is bundled with this package in the file LICENSE.txt
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade Payone_Core to newer
 * versions in the future. If you wish to customize Payone_Core for your
 * needs please refer to http://www.payone.de for more information.
 *
 * @category        Payone
 * @package         js
 * @subpackage      payone
 * @copyright       Copyright (c) 2012 <info@noovias.com> - www.noovias.com
 * @author          Matthias Walter <info@noovias.com>
 * @license         <http://www.gnu.org/licenses/> GNU General Public License (GPL 3)
 * @link            http://www.noovias.com
 */

/**
 * @param element
 */
function payoneSwitchOnlineBankTransfer(element) {
    if(element == undefined){
        return;
    }
    var ElementValue = element.value;
    var ElementValueSplit = ElementValue.split('_');
    var typeId = ElementValueSplit[0];
    var typeCode = ElementValueSplit[1];

    $("payone_online_bank_transfer_obt_type").setValue(typeCode);
    $("payone_online_bank_transfer_config_id").setValue(typeId);

    var accountNumberWrap = $('account_number_wrap');
    var bankCodeWrap = $('bank_code_wrap');
    var bankGroupWrapAt = $('bank_group_wrap_at');
    var bankGroupWrapNl = $('bank_group_wrap_nl');

    var accountNumberInput = $('payone_online_bank_transfer_account_number');
    var bankCodeInput = $('payone_online_bank_transfer_bank_code');
    var bankGroupSelectAt = $('payone_online_bank_transfer_bank_group_at');
    var bankGroupSelectNl = $('payone_online_bank_transfer_bank_group_nl');

    if (ElementValue == '' || typeCode == 'PFF' || typeCode == 'PFC') {
        disableAll();
    } else if (typeCode == 'PNT' || typeCode == 'GPY') {
        disableAll();
        enableAccountNumber();
        enableBankCode()
    } else if (typeCode == 'EPS') {
        disableAll();
        enableBankGroupAt();
    } else if (typeCode == 'IDL') {
        disableAll();
        enableBankGroupNl();
    }

    function disableAll() {
        accountNumberWrap.hide();
        accountNumberInput.setAttribute("disabled", "disabled");
        bankCodeWrap.hide();
        bankCodeInput.setAttribute("disabled", "disabled");
        bankGroupWrapAt.hide();
        bankGroupSelectAt.setAttribute("disabled", "disabled");
        bankGroupWrapNl.hide();
        bankGroupSelectNl.setAttribute("disabled", "disabled");
    }

    function enableAccountNumber() {
        accountNumberWrap.show();
        accountNumberInput.removeAttribute("disabled");
    }

    function enableBankCode() {
        bankCodeWrap.show();
        bankCodeInput.removeAttribute("disabled");
    }

    function enableBankGroupAt() {
        bankGroupWrapAt.show();
        bankGroupSelectAt.removeAttribute("disabled");
    }

    function enableBankGroupNl() {
        bankGroupWrapNl.show();
        bankGroupSelectNl.removeAttribute("disabled");
    }
}

Event.observe(document, "dom:loaded", function () {
    payoneSwitchOnlineBankTransfer($('payone_online_bank_transfer_obt_type_select'));
});
Event.observe(document, "dom:ready", function () {
    payoneSwitchOnlineBankTransfer($('payone_online_bank_transfer_obt_type_select'));
});

// we need to call the switch method after refreshing payment section via ajax
// unfortunately there is no specific property to identify the needed ajax request
Ajax.Responders.register({
    onComplete: function(transport, element) {
        var typeSelect = $('payone_online_bank_transfer_obt_type_select');
        if (typeSelect == undefined) {
            return;
        }
        var url = element.request.url;
        if (url.indexOf('checkout/onepage/saveShippingMethod') !== -1 || url.indexOf('checkout/onepage/progress') !== 1) {
            payoneSwitchOnlineBankTransfer(typeSelect);
        }
    }
});
