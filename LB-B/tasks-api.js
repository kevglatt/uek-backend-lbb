const express = require('express');
const app = express();
const port = 3000;
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');
const fs = require('fs').promises;
let tasks = [
    {
        "id": 1,
        "title": "Franchot",
        "description": "Phasellus in felis. Donec semper sapien a libero. Nam dui.",
        "done": null,
        "dueDate": "03-09-2023"
    },
    {
        "id": 2,
        "title": "Sherm",
        "description": "Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.\n\nIn quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.",
        "done": null,
        "dueDate": "26-07-2023"
    },
    {
        "id": 3,
        "title": "Ricca",
        "description": "Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.",
        "done": null,
        "dueDate": "14-10-2023"
    },
    {
        "id": 4,
        "title": "Lazare",
        "description": "Fusce consequat. Nulla nisl. Nunc nisl.",
        "done": null,
        "dueDate": "30-10-2023"
    },
    {
        "id": 5,
        "title": "Victoria",
        "description": "In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.",
        "done": null,
        "dueDate": "01-11-2023"
    },
    {
        "id": 6,
        "title": "Isabelita",
        "description": "Curabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.",
        "done": null,
        "dueDate": "23-03-2024"
    },
    {
        "id": 7,
        "title": "Daniella",
        "description": "Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.\n\nCurabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.",
        "done": null,
        "dueDate": "16-11-2023"
    },
    {
        "id": 8,
        "title": "Stinky",
        "description": "Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.",
        "done": null,
        "dueDate": "06-08-2023"
    },
    {
        "id": 9,
        "title": "Robenia",
        "description": "Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.\n\nIn congue. Etiam justo. Etiam pretium iaculis justo.\n\nIn hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.",
        "done": null,
        "dueDate": "17-05-2024"
    },
    {
        "id": 10,
        "title": "Tracey",
        "description": "Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.\n\nIn hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.",
        "done": null,
        "dueDate": "26-09-2023"
    },
    {
        "id": 11,
        "title": "Robyn",
        "description": "Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.",
        "done": "07-07-2023",
        "dueDate": "09-02-2024"
    },
    {
        "id": 12,
        "title": "Berti",
        "description": "Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.",
        "done": null,
        "dueDate": "29-12-2023"
    },
    {
        "id": 13,
        "title": "Bruce",
        "description": "Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.\n\nAenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.\n\nCurabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.",
        "done": null,
        "dueDate": "13-12-2023"
    },
    {
        "id": 14,
        "title": "Jethro",
        "description": "Curabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.",
        "done": null,
        "dueDate": "26-04-2024"
    },
    {
        "id": 15,
        "title": "Katharyn",
        "description": "Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.\n\nDonec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.",
        "done": null,
        "dueDate": "01-06-2024"
    },
    {
        "id": 16,
        "title": "Ivor",
        "description": "Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.\n\nCurabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.\n\nPhasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.",
        "done": null,
        "dueDate": "17-12-2023"
    },
    {
        "id": 17,
        "title": "Selia",
        "description": "Phasellus in felis. Donec semper sapien a libero. Nam dui.\n\nProin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.",
        "done": null,
        "dueDate": "25-06-2024"
    },
    {
        "id": 18,
        "title": "Lexi",
        "description": "Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.\n\nPraesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.\n\nCras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",
        "done": null,
        "dueDate": "17-09-2023"
    },
    {
        "id": 19,
        "title": "Brennen",
        "description": "Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.",
        "done": null,
        "dueDate": "24-06-2023"
    },
    {
        "id": 20,
        "title": "Jemmie",
        "description": "Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.\n\nMorbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.\n\nFusce consequat. Nulla nisl. Nunc nisl.",
        "done": null,
        "dueDate": "10-02-2024"
    },
    {
        "id": 21,
        "title": "Flory",
        "description": "Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.\n\nEtiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.",
        "done": null,
        "dueDate": "03-07-2023"
    },
    {
        "id": 22,
        "title": "Donia",
        "description": "Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.",
        "done": null,
        "dueDate": "24-06-2023"
    },
    {
        "id": 23,
        "title": "Dari",
        "description": "Fusce consequat. Nulla nisl. Nunc nisl.\n\nDuis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.\n\nIn hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.",
        "done": "17-11-2023",
        "dueDate": "15-12-2023"
    },
    {
        "id": 24,
        "title": "Sansone",
        "description": "Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.\n\nMorbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.\n\nFusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.",
        "done": "21-05-2023",
        "dueDate": "16-12-2023"
    },
    {
        "id": 25,
        "title": "Leshia",
        "description": "Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.\n\nCurabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.",
        "done": null,
        "dueDate": "01-06-2024"
    },
    {
        "id": 26,
        "title": "Corabelle",
        "description": "Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.\n\nPhasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.\n\nProin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.",
        "done": null,
        "dueDate": "26-11-2023"
    },
    {
        "id": 27,
        "title": "Winnie",
        "description": "Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.\n\nProin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.",
        "done": null,
        "dueDate": "18-08-2023"
    },
    {
        "id": 28,
        "title": "Roland",
        "description": "Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.",
        "done": null,
        "dueDate": "14-05-2024"
    },
    {
        "id": 29,
        "title": "Kyle",
        "description": "Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.\n\nIn congue. Etiam justo. Etiam pretium iaculis justo.",
        "done": null,
        "dueDate": "27-06-2024"
    },
    {
        "id": 30,
        "title": "Britteny",
        "description": "Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.\n\nCras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.\n\nProin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.",
        "done": null,
        "dueDate": "11-03-2024"
    },
    {
        "id": 31,
        "title": "Rubi",
        "description": "Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.\n\nCurabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.",
        "done": null,
        "dueDate": "15-10-2023"
    },
    {
        "id": 32,
        "title": "Ethe",
        "description": "Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.\n\nIn quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.",
        "done": null,
        "dueDate": "26-06-2023"
    },
    {
        "id": 33,
        "title": "Jessy",
        "description": "Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.\n\nMaecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.\n\nCurabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.",
        "done": null,
        "dueDate": "09-07-2023"
    },
    {
        "id": 34,
        "title": "Fidelity",
        "description": "Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.\n\nCras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",
        "done": null,
        "dueDate": "29-09-2023"
    },
    {
        "id": 35,
        "title": "Rutledge",
        "description": "Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.",
        "done": null,
        "dueDate": "07-09-2023"
    },
    {
        "id": 36,
        "title": "Risa",
        "description": "Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.",
        "done": null,
        "dueDate": "16-11-2023"
    },
    {
        "id": 37,
        "title": "Braden",
        "description": "Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.\n\nPhasellus in felis. Donec semper sapien a libero. Nam dui.\n\nProin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.",
        "done": null,
        "dueDate": "17-06-2023"
    },
    {
        "id": 38,
        "title": "Rori",
        "description": "Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.",
        "done": null,
        "dueDate": "01-04-2024"
    },
    {
        "id": 39,
        "title": "Sheri",
        "description": "Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.",
        "done": null,
        "dueDate": "09-06-2023"
    },
    {
        "id": 40,
        "title": "Giselle",
        "description": "In congue. Etiam justo. Etiam pretium iaculis justo.\n\nIn hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.",
        "done": null,
        "dueDate": "18-09-2023"
    },
    {
        "id": 41,
        "title": "Cesaro",
        "description": "Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.",
        "done": null,
        "dueDate": "07-02-2024"
    },
    {
        "id": 42,
        "title": "Bertie",
        "description": "Phasellus in felis. Donec semper sapien a libero. Nam dui.\n\nProin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.\n\nInteger ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.",
        "done": null,
        "dueDate": "17-10-2023"
    },
    {
        "id": 43,
        "title": "Marlon",
        "description": "Fusce consequat. Nulla nisl. Nunc nisl.",
        "done": null,
        "dueDate": "05-09-2023"
    },
    {
        "id": 44,
        "title": "Kevan",
        "description": "Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.\n\nIn congue. Etiam justo. Etiam pretium iaculis justo.",
        "done": null,
        "dueDate": "26-08-2023"
    },
    {
        "id": 45,
        "title": "Benedikt",
        "description": "Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.\n\nPraesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.\n\nCras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",
        "done": null,
        "dueDate": "12-10-2023"
    },
    {
        "id": 46,
        "title": "Vallie",
        "description": "Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.\n\nSed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.\n\nPellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.",
        "done": null,
        "dueDate": "21-12-2023"
    },
    {
        "id": 47,
        "title": "Welbie",
        "description": "Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.\n\nInteger tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.\n\nPraesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.",
        "done": "30-08-2023",
        "dueDate": "10-01-2024"
    },
    {
        "id": 48,
        "title": "Rafe",
        "description": "Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.",
        "done": "18-05-2023",
        "dueDate": "09-08-2023"
    },
    {
        "id": 49,
        "title": "Jobye",
        "description": "Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.\n\nCum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.\n\nEtiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.",
        "done": null,
        "dueDate": "27-02-2024"
    },
    {
        "id": 50,
        "title": "Minnnie",
        "description": "Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.\n\nCum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
        "done": null,
        "dueDate": "06-02-2024"
    },
    {
        "id": 51,
        "title": "Branden",
        "description": "Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.\n\nMorbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.",
        "done": "12-10-2023",
        "dueDate": "17-05-2024"
    },
    {
        "id": 52,
        "title": "Basilio",
        "description": "Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.\n\nCras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.\n\nProin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.",
        "done": null,
        "dueDate": "26-03-2024"
    },
    {
        "id": 53,
        "title": "Kari",
        "description": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus.\n\nVestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.\n\nDuis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.",
        "done": "04-03-2024",
        "dueDate": "27-11-2023"
    },
    {
        "id": 54,
        "title": "Edwina",
        "description": "Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.\n\nCras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.\n\nQuisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.",
        "done": null,
        "dueDate": "30-04-2024"
    },
    {
        "id": 55,
        "title": "Ward",
        "description": "Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.\n\nFusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.",
        "done": null,
        "dueDate": "04-07-2023"
    },
    {
        "id": 56,
        "title": "Nora",
        "description": "Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.",
        "done": null,
        "dueDate": "29-04-2024"
    },
    {
        "id": 57,
        "title": "Anabal",
        "description": "Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.\n\nEtiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.",
        "done": null,
        "dueDate": "23-04-2024"
    },
    {
        "id": 58,
        "title": "Pierette",
        "description": "Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.\n\nPraesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.",
        "done": null,
        "dueDate": "08-08-2023"
    },
    {
        "id": 59,
        "title": "Mame",
        "description": "In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.\n\nSuspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.",
        "done": null,
        "dueDate": "10-10-2023"
    },
    {
        "id": 60,
        "title": "Sollie",
        "description": "Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.\n\nCurabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.",
        "done": null,
        "dueDate": "11-07-2023"
    },
    {
        "id": 61,
        "title": "Ashton",
        "description": "In congue. Etiam justo. Etiam pretium iaculis justo.\n\nIn hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.",
        "done": "04-01-2024",
        "dueDate": "31-01-2024"
    },
    {
        "id": 62,
        "title": "Isabelle",
        "description": "Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.\n\nMorbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.\n\nFusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.",
        "done": null,
        "dueDate": "19-08-2023"
    },
    {
        "id": 63,
        "title": "Lonna",
        "description": "Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.\n\nMorbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.",
        "done": null,
        "dueDate": "09-08-2023"
    },
    {
        "id": 64,
        "title": "Germaine",
        "description": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus.\n\nVestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.\n\nDuis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.",
        "done": null,
        "dueDate": "19-02-2024"
    },
    {
        "id": 65,
        "title": "Kendal",
        "description": "Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.\n\nDuis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.",
        "done": null,
        "dueDate": "30-10-2023"
    },
    {
        "id": 66,
        "title": "Drud",
        "description": "Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.",
        "done": "02-10-2023",
        "dueDate": "22-06-2024"
    },
    {
        "id": 67,
        "title": "Eldredge",
        "description": "Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.",
        "done": null,
        "dueDate": "15-10-2023"
    },
    {
        "id": 68,
        "title": "Tuckie",
        "description": "Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.\n\nProin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.",
        "done": null,
        "dueDate": "15-06-2023"
    },
    {
        "id": 69,
        "title": "Bo",
        "description": "Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
        "done": null,
        "dueDate": "27-06-2024"
    },
    {
        "id": 70,
        "title": "Elisabet",
        "description": "In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.\n\nNulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.",
        "done": null,
        "dueDate": "30-07-2023"
    },
    {
        "id": 71,
        "title": "Erick",
        "description": "Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.",
        "done": null,
        "dueDate": "28-11-2023"
    },
    {
        "id": 72,
        "title": "Freedman",
        "description": "Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.\n\nNam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.",
        "done": null,
        "dueDate": "22-11-2023"
    },
    {
        "id": 73,
        "title": "Stephen",
        "description": "Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.\n\nMorbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.",
        "done": null,
        "dueDate": "26-10-2023"
    },
    {
        "id": 74,
        "title": "Derwin",
        "description": "Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.\n\nPhasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.\n\nProin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.",
        "done": null,
        "dueDate": "22-04-2024"
    },
    {
        "id": 75,
        "title": "Dela",
        "description": "Phasellus in felis. Donec semper sapien a libero. Nam dui.\n\nProin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.\n\nInteger ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.",
        "done": "03-08-2023",
        "dueDate": "13-08-2023"
    },
    {
        "id": 76,
        "title": "Randa",
        "description": "Fusce consequat. Nulla nisl. Nunc nisl.\n\nDuis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.\n\nIn hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.",
        "done": null,
        "dueDate": "01-09-2023"
    },
    {
        "id": 77,
        "title": "Paulie",
        "description": "Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.\n\nCras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",
        "done": null,
        "dueDate": "07-01-2024"
    },
    {
        "id": 78,
        "title": "Nada",
        "description": "Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.\n\nMaecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.",
        "done": null,
        "dueDate": "23-08-2023"
    },
    {
        "id": 79,
        "title": "Quinta",
        "description": "Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.\n\nIn sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.",
        "done": null,
        "dueDate": "27-06-2023"
    },
    {
        "id": 80,
        "title": "Christian",
        "description": "Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.\n\nInteger ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.\n\nNam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.",
        "done": null,
        "dueDate": "03-12-2023"
    },
    {
        "id": 81,
        "title": "Katie",
        "description": "Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.",
        "done": null,
        "dueDate": "22-07-2023"
    },
    {
        "id": 82,
        "title": "Alvis",
        "description": "Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.\n\nQuisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.",
        "done": null,
        "dueDate": "30-01-2024"
    },
    {
        "id": 83,
        "title": "Daryl",
        "description": "Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.",
        "done": null,
        "dueDate": "07-03-2024"
    },
    {
        "id": 84,
        "title": "Willyt",
        "description": "Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.\n\nPhasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.\n\nProin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.",
        "done": null,
        "dueDate": "23-04-2024"
    },
    {
        "id": 85,
        "title": "Kattie",
        "description": "Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.\n\nCras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.\n\nProin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.",
        "done": null,
        "dueDate": "19-03-2024"
    },
    {
        "id": 86,
        "title": "Leigh",
        "description": "Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.\n\nProin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.",
        "done": null,
        "dueDate": "14-02-2024"
    },
    {
        "id": 87,
        "title": "Anya",
        "description": "Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.",
        "done": "14-12-2023",
        "dueDate": "15-11-2023"
    },
    {
        "id": 88,
        "title": "Emalee",
        "description": "In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.",
        "done": null,
        "dueDate": "15-11-2023"
    },
    {
        "id": 89,
        "title": "Wolfy",
        "description": "Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.\n\nQuisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.",
        "done": null,
        "dueDate": "06-01-2024"
    },
    {
        "id": 90,
        "title": "Idelle",
        "description": "Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.",
        "done": null,
        "dueDate": "30-05-2024"
    },
    {
        "id": 91,
        "title": "Petra",
        "description": "Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.",
        "done": null,
        "dueDate": "31-03-2024"
    },
    {
        "id": 92,
        "title": "Raf",
        "description": "In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.",
        "done": null,
        "dueDate": "26-11-2023"
    },
    {
        "id": 93,
        "title": "Randie",
        "description": "In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.\n\nMaecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.\n\nMaecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.",
        "done": null,
        "dueDate": "13-06-2024"
    },
    {
        "id": 94,
        "title": "Annie",
        "description": "In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.\n\nAliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.\n\nSed ante. Vivamus tortor. Duis mattis egestas metus.",
        "done": null,
        "dueDate": "18-03-2024"
    },
    {
        "id": 95,
        "title": "Colver",
        "description": "Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.\n\nAenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.",
        "done": "20-04-2024",
        "dueDate": "24-07-2023"
    },
    {
        "id": 96,
        "title": "Wally",
        "description": "Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.\n\nFusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.\n\nSed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.",
        "done": null,
        "dueDate": "28-03-2024"
    },
    {
        "id": 97,
        "title": "Daile",
        "description": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus.\n\nVestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.\n\nDuis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.",
        "done": null,
        "dueDate": "30-06-2023"
    },
    {
        "id": 98,
        "title": "Junette",
        "description": "Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.",
        "done": null,
        "dueDate": "21-01-2024"
    },
    {
        "id": 99,
        "title": "Tallia",
        "description": "Sed ante. Vivamus tortor. Duis mattis egestas metus.\n\nAenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.\n\nQuisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.",
        "done": null,
        "dueDate": "24-05-2024"
    },
    {
        "id": 100,
        "title": "Sarette",
        "description": "Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.\n\nPraesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.\n\nCras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",
        "done": null,
        "dueDate": "12-02-2024"
    }];
let idIncrement = tasks.length

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

app.get('/tasks', (req, res) => {
    /*
    #swagger.summary = 'Retrieves all tasks'
    #swagger.tags = ['Tasks']
    #swagger.responses[200] = {
        schema: { $ref: "#/definitions/task" },
        description: 'List of all Tasks'
    }
    */
    res.send(tasks);
});

app.post('/tasks', (req, res) => {
    /*
    #swagger.summary = 'Add new Task'
    #swagger.tags = ['Tasks']
    #swagger.parameters['body'] = {
        in: 'body',
        description: 'Task Object',
        required: true,
        schema: {
            $ref: "#/definitions/taskWithoutId"
        }
    }
    #swagger.responses[200] = {
        schema: {
            $ref: "#/definitions/task"
        },
        description: 'Added task'
    }
    #swagger.responses[400] = {
        description: 'Bad Request'
    }
    #swagger.responses[409] = {
        description: 'Task already exists'
    }

    */
    const newTask = req.body
    if (!newTask) {
        res.sendStatus(400)
    }
    for (const task in tasks) {
        if (task === newTask) {
            res.sendStatus(409);
        }
    }
    tasks.push({
        id: idIncrement+=1,
        title: newTask.title,
        description: newTask.description,
        done: newTask.done,
        dueDate: newTask.dueDate
    });
    res.status(201).send(tasks[tasks.length - 1]);
});
app.get('/tasks/:id', (req, res) => {
    /*
    #swagger.summary = 'Retrive Book with ISBN number'
    #swagger.tags = ['Tasks']
    #swagger.parameters['id'] {
        in: 'path',
        description: 'Task with id',
        required: true,
        schema: {$ref: "#/definitions/id"}
    }
    #swagger.responses[200] = {
        schema: { $ref: "#/definitions/task"},
        description: 'Task with id'
    }
        #swagger.responses[404] = {
        description: 'Invalid request parameter'
    }
    */
    const id = +req.params.id;
    if (!id) {
        res.sendStatus(404)
    }
    for (let task of tasks) {
        if (task.id === id) {
            res.json(task);
            break
        }
    }
});

app.put('/tasks/:id', (req, res) => {
    /*
    #swagger.summary = 'Overwrite task with id'
    #swagger.tags = ['Tasks']
    #swagger.parameters['body'] = {
        in: 'body',
        description: 'Task without id',
        required: true,
        schema: {
            $ref: "#/definitions/taskWithoutId"
        }
    }
    #swagger.parameters['id'] {
        in: 'path',
        description: 'Id of task to overwrite',
        required: true,
        schema: {$ref: "#/definitions/id"}
    }
    #swagger.responses[200] = {
        schema: {
            $ref: "#/definitions/task"
        },
        description: 'Task successfully updated'
    }
        #swagger.responses[404] = {
        description: 'Bad request'
    }
    */
    const id = +req.params.id
    const taskToOverwrite = tasks.findIndex(task => task.id === id);
    if (id && taskToOverwrite >= 0) {
        tasks[taskToOverwrite] = {
            id: id,
            title: req.body.title,
            description: req.body.description,
            done: req.body.done,
            dueDate: req.body.dueDate
        };
        res.send(tasks[taskToOverwrite]);
    } else {
        res.sendStatus(404);
    }
});

app.delete('/tasks/:id', (req, res) => {
    /*
    #swagger.summary = 'Delete task with id number'
    #swagger.tags = ['Tasks']
    #swagger.parameters['id'] {
        in: 'path',
        description: 'Id of task to delete',
        required: true,
        schema: {$ref: "#/definitions/id"}
    }
    #swagger.responses[200] = {
        schema: {
            $ref: "#/definitions/task"
        },
        description: 'Task successfully deleted'
    }
    */

    const id = +req.params.id
    const taskToDelete = tasks.findIndex(task => task.id === id);
    if (id && taskToDelete >= 0) {
        const task = tasks[taskToDelete];
        tasks.slice(taskToDelete, 1);
        res.send(task)
    } else {
        res.sendStatus(404);
    }
})



