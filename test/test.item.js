describe('Item', function() {
    var listEl = $('<div id="list">\
        <ul class="list">\
            <li>\
                <span class="name">Jonny</span>\
                <span class="born">1986</span>\
                <span class="doin">Living the dream</span>\
            </li>\
        </ul>\
    </div>');

    $(document.body).append(listEl);

    var list = new List('list', { valueNames: ['name', 'born', 'doin'] });
    var item = list.get('name', 'Jonny');

    describe('Defaults', function() {
        it('should have all default attributes', function() {
            expect(item.found).to.be.false;
            expect(item.filtered).to.be.false;
        });

        it('should have the right elements', function() {
            expect(item.elm).to.equal(listEl.find('li')[0]);
        });

        it('should have all default methods', function() {
            expect(item).to.respondTo('hide');
            expect(item).to.respondTo('matching');
            expect(item).to.respondTo('show');
            expect(item).to.respondTo('values');
            expect(item).to.respondTo('visible');
        });
    });

    describe('Values()', function() {
        it('should have the right values', function() {
            expect(item.values()).to.deep.equal({
                name: 'Jonny',
                born: '1986',
                doin: 'Living the dream'
            });
        });
        it('should be able to change one value', function() {
            expect(item.values().name).to.be.equal('Jonny');
            item.values({ name: 'Egon' });
            expect(item.values().name).to.be.equal('Egon');
        });
        it('should be able to change many value', function() {
            expect(item.values()).to.deep.equal({
                name: 'Egon',
                born: '1986',
                doin: 'Living the dream'
            });
            item.values({
                name: 'Sven',
                born: '1801',
                doin: 'Is dead'
            });
            expect(item.values()).to.deep.equal({
                name: 'Sven',
                born: '1801',
                doin: 'Is dead'
            });
        });
    });

    describe('Hide, show, visible', function() {
        it('should be hidden', function() {
            expect(listEl.find('li').size()).to.equal(1);
            item.hide();
            expect(item.visible()).to.be.false;
            expect(listEl.find('li').size()).to.equal(0);
        });
        it('should be visible', function() {
            expect(listEl.find('li').size()).to.equal(0);
            item.show();
            expect(item.visible()).to.be.true;
            expect(listEl.find('li').size()).to.equal(1);
        });
    });

    describe('Matching, found, filtered', function() {
        describe('Searching', function() {
            it('should not be visible, match, found or filtered', function() {
                list.search('Fredrik');
                expect(item.matching()).to.be.false;
                expect(item.found).to.be.false;
                expect(item.filtered).to.be.false;
                expect(item.visible()).to.be.false;
            });
            it('should be visble, match and found but not filterd', function() {
                list.search('Sven');
                expect(item.matching()).to.be.true;
                expect(item.found).to.be.true;
                expect(item.filtered).to.be.false;
                expect(item.visible()).to.be.true;
            });
            it('reset: should be visible and matching but not found or filtered', function() {
                list.search();
                expect(item.matching()).to.be.true;
                expect(item.found).to.be.false;
                expect(item.filtered).to.be.false;
                expect(item.visible()).to.be.true;
            });
        });
        describe('Filtering', function() {
            it('should not be visble, match, found or filtered', function() {
                list.filter(function(item) {
                    return (item.values().name == "Fredrik");
                });
                expect(item.matching()).to.be.false;
                expect(item.found).to.be.false;
                expect(item.filtered).to.be.false;
                expect(item.visible()).to.be.false;
            });
            it('should be visble, match and filtered but not found', function() {
                list.filter(function(item) {
                    return (item.values().name == "Sven");
                });
                expect(item.matching()).to.be.true;
                expect(item.found).to.be.false;
                expect(item.filtered).to.be.true;
                expect(item.visible()).to.be.true;
            });
            it('reset: should be visble and match but not filtered or found', function() {
                list.filter();
                expect(item.matching()).to.be.true;
                expect(item.found).to.be.false;
                expect(item.filtered).to.be.false;
                expect(item.visible()).to.be.true;
            });
        });
    });

    listEl.remove();
});