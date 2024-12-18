




document.addEventListener("DOMContentLoaded", function () {
    const dateFields = document.querySelectorAll('input[type="date"]');

    dateFields.forEach((field) => {
   
        field.classList.add('date-input');

        const datePickerWrapper = document.createElement('div');
        datePickerWrapper.classList.add('date-picker');
        field.parentNode.insertBefore(datePickerWrapper, field);
        datePickerWrapper.appendChild(field);

        // إضافة أيقونة التقويم
        const calendarIcon = document.createElement('i');
        calendarIcon.classList.add('fas', 'fa-calendar-days', 'calendar-icon');
        datePickerWrapper.appendChild(calendarIcon);

        const calendar = document.createElement('div');
        calendar.classList.add('calendar');
        datePickerWrapper.appendChild(calendar);

        let currentDate = new Date();
        let selectedDate = null;

        const locale = navigator.language || "ar"; // استخدام لغة المتصفح الافتراضية
        const months = Array.from({ length: 12 }, (_, i) =>
            new Intl.DateTimeFormat(locale, { month: "long" }).format(new Date(0, i))
        );
        const weekdays = Array.from({ length: 7 }, (_, i) =>
            new Intl.DateTimeFormat(locale, { weekday: "short" }).format(new Date(0, 0, i + 1))
        );

        function renderCalendar() {
            const year = currentDate.getFullYear();
            const month = currentDate.getMonth();

            calendar.innerHTML = `
                <div class="calendar-header">
                    <button class="prevYear"><i class="fas fa-angle-double-right"></i></button>
                    <button class="prevMonth"><i class="fas fa-angle-right"></i></button>
                    <span class="month-selector">${months[month]}</span>
                    <span class="year-selector">${year}</span>
                    <button class="nextMonth"><i class="fas fa-angle-left"></i></button>
                    <button class="nextYear"><i class="fas fa-angle-double-left"></i></button>
                </div>
                <div class="calendar-body">
                    <div class="calendar-days"></div>
                </div>
                <div class="calendar-footer">
                    <button class="today-btn">اليوم</button>
                </div>
            `;

            const daysContainer = calendar.querySelector('.calendar-days');
            daysContainer.innerHTML = weekdays.map((day) => `<div>${day}</div>`).join('');

            const firstDay = new Date(year, month, 1).getDay();
            const daysInMonth = new Date(year, month + 1, 0).getDate();

            for (let i = 0; i < firstDay; i++) {
                daysContainer.innerHTML += `<div class="calendar-day disabled"></div>`;
            }

            const today = new Date();

            for (let day = 1; day <= daysInMonth; day++) {
                const dayElement = document.createElement('div');
                dayElement.classList.add('calendar-day');
                dayElement.textContent = day;

                if (
                    today.getFullYear() === year &&
                    today.getMonth() === month &&
                    today.getDate() === day
                ) {
                    dayElement.classList.add('today');
                }

                if (
                    selectedDate &&
                    selectedDate.getFullYear() === year &&
                    selectedDate.getMonth() === month &&
                    selectedDate.getDate() === day
                ) {
                    dayElement.classList.add('selected');
                }

                dayElement.addEventListener('click', () => {
                    selectedDate = new Date(year, month, day);
                    field.value = formatDate(selectedDate);
                    calendar.style.display = 'none';
                });

                daysContainer.appendChild(dayElement);
            }
                calendar.querySelector('.prevMonth').addEventListener('click', (e) => {
                    e.stopPropagation();
                    currentDate.setMonth(currentDate.getMonth() - 1);
                    renderCalendar();
                });

                calendar.querySelector('.nextMonth').addEventListener('click', (e) => {
                    e.stopPropagation();
                    currentDate.setMonth(currentDate.getMonth() + 1);
                    renderCalendar();
                });

                calendar.querySelector('.prevYear').addEventListener('click', (e) => {
                    e.stopPropagation();
                    currentDate.setFullYear(currentDate.getFullYear() - 1);
                    renderCalendar();
                });

                calendar.querySelector('.nextYear').addEventListener('click', (e) => {
                    e.stopPropagation();
                    currentDate.setFullYear(currentDate.getFullYear() + 1);
                    renderCalendar();
                });

                calendar.querySelector('.month-selector').addEventListener('click', (e) => {
                    e.stopPropagation();
                    renderMonthSelector();
                });

                calendar.querySelector('.year-selector').addEventListener('click', (e) => {
                    e.stopPropagation();
                    renderYearSelector();
                });
             calendar.querySelector('.today-btn').addEventListener('click', () => {
                    selectedDate = new Date();
                    field.value = formatDate(selectedDate);
                    calendar.style.display = 'none';
                });
            }
            function renderMonthSelector() {
    const currentMonth = new Date().getMonth();

    calendar.innerHTML = `
        <div class="month-selector-popup">
            ${months.map((month, index) => `
                <div class="month-option ${index === currentMonth ? 'current-month' : ''}" data-month="${index}">
                    ${month}
                </div>
            `).join('')}
        </div>
    `;

    const monthOptions = calendar.querySelectorAll('.month-option');
    monthOptions.forEach((option) => {
        option.addEventListener('click', () => {
            currentDate.setMonth(parseInt(option.dataset.month, 10));
            renderCalendar();
        });
    });
}


            function renderYearSelector() {
    const currentYear = new Date().getFullYear();
    const startYear = currentYear - 9;
    const endYear = currentYear + 10;

    calendar.innerHTML = `
        <div class="year-selector-popup">
            ${Array.from({ length: endYear - startYear + 1 }, (_, i) => {
                const year = startYear + i;
                return `
                    <div class="year-option ${year === currentYear ? 'current-year' : ''}" data-year="${year}">
                        ${year}
                    </div>
                `;
            }).join('')}
        </div>
    `;

    const yearOptions = calendar.querySelectorAll('.year-option');
    yearOptions.forEach((option) => {
        option.addEventListener('click', () => {
            currentDate.setFullYear(parseInt(option.dataset.year, 10));
            renderCalendar();
        });
    });
}

            function formatDate(date) {
                const day = String(date.getDate()).padStart(2, '0');
                const month = String(date.getMonth() + 1).padStart(2, '0');
                const year = date.getFullYear();
                return `${year}-${month}-${day}`;
            }

            // عند النقر على أيقونة التقويم، افتح نافذة التقويم
            calendarIcon.addEventListener('click', () => {
                calendar.style.display = 'block';
                renderCalendar();
            });

            document.addEventListener('click', (e) => {
                if (!e.target.closest('.date-picker')) {
                    calendar.style.display = 'none';
                }
            });

            calendar.addEventListener('click', (e) => {
                e.stopPropagation();
            });
        });
    });