require('jquery-parallax.js/parallax.min.js');


$(function(){
	$('.mod_article#about-1').parallax({
		imageSrc:'../../../../files/images/timeline/bg/About-Header-2.png',
		position:'center bottom',
	});


	let header = $('.headerFW').headerFW('get');
	header.$toggler.insertAfter($('.headerFW__logo'))
	header.$toggler.on('click',updateVarLogoHeight)
}); 



let updateVarLogoHeight = function(){
	let logoWrapperHeight = 0;
	if (document.querySelector('.headerFW__logo__wrapper '))
		logoWrapperHeight += (parseInt(window.getComputedStyle(document.querySelector('.headerFW__logo__wrapper ')).height) * -1) - 1;
	logoWrapperHeight += 'px';
	document.documentElement.style.setProperty('--logo-wrapper-height',logoWrapperHeight);
}
updateVarLogoHeight();
window.addEventListener("resize", updateVarLogoHeight);

/**
 * check the nav size and if it need to switch between reduced and not-reduced states
 */
app.HeaderFW.prototype.navChecker = function(){
    var header = this;
    var isOffset = false;
    var totalNavWidth = 0;
    if (header.$el.hasClass('is-reduce')) {
        if (header.$search) header.$nav.append(header.$search);
        if (header.$lang)   header.$nav.append(header.$lang);
        if (header.$postnav)   header.$nav.append(header.$postnav);
    }
    header.$nav.children().not('.headerFW__nav__panel,.headerFW__nav__toggler,.exclude').each(function (){
        totalNavWidth+=$(this).outerWidth();
    });
    if (header.$el.hasClass('is-reduce')) {
        if (header.$search) header.$search.appendTo(header.navPanelMenus.root.$el.find('.panel__actions'));
        if (header.$lang)   header.$lang.appendTo(header.navPanelMenus.root.$el.find('.panel__actions'));
        if (header.$postnav)   header.$postnav.appendTo(header.navPanelMenus.root.$el.find('.panel__actions'));
    }
    if((header.$nav.position().left + totalNavWidth).toFixed(2) > header.$el.outerWidth() || header.$nav.position().left.toFixed(2) < 0)
        isOffset = true;

    if(isOffset){
        header.navSwitcher(isOffset);
    }
    else{
        if(!header.$navPanel.hasClass('active')){
            header.navSwitcher(isOffset);
        }
    }
    header.panelChecker();
};
/**
 * switch the header between reduced and not-reduced states
 * @param  {Boolean} reduce 
 */
app.HeaderFW.prototype.navSwitcher = function(reduce = false){
    var header = this;
    if (reduce) {
        header.$el.addClass('is-reduce');
        if (header.$search) header.$search.appendTo(header.navPanelMenus.root.$el.find('.panel__actions'));
        if (header.$lang)   header.$lang.appendTo(header.navPanelMenus.root.$el.find('.panel__actions'));
        if (header.$postnav)   header.$postnav.appendTo(header.navPanelMenus.root.$el.find('.panel__actions'));
    } else {
        header.$el.removeClass('is-reduce');
        if (header.$search) header.$nav.append(header.$search);
        if (header.$lang)   header.$nav.append(header.$lang);
        if (header.$postnav)   header.$nav.append(header.$postnav);
    }
};