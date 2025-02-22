import { CustomSeo } from '@/components'
import { AlertResume, HowToPrintDialog } from '@/components/dialog'

import { UnstyledButton } from '@/UI/buttons'
import { UnderlineLink } from '@/UI/links'

import { EDUCATION, EXPERIENCE, HEADLINE, KEY_SKILLS, LANGUAGES, LINKS, SKILLS, SUMMARY, CONTACT } from '@/libs/constants/resume'
import { generateOgImage, getMetaPage } from '@/libs/metapage'

import { useMediaQuery } from '@/hooks'

import htmr from 'htmr'
import type { NextPage } from 'next'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { HiInformationCircle } from 'react-icons/hi'

const meta = getMetaPage({
  title: 'Resume',
  description:
    "Personal resume that I build on the web, I use my creativity to build my personal resume on the web instead on a regular 'paper'.",
  keywords: ['Taufik Crisnawan Santosa', 'resume', 'curriculum vitae', 'Taufik Crisnawan cv', 'Taufik Crisnawan Santosa resume'],
  og_image: generateOgImage({ title: 'Resume - taufikcrisnawan.dev', subTitle: 'Take a look at my resume' }),
  og_image_alt: 'Resume — taufikcrisnawan.dev',
  slug: '/resume',
  type: 'website'
})

const Resume: NextPage = () => {
  const listStyle = useMemo(() => 'list-disc list-inside [&>li]:my-2', [])
  const isMatch = useMediaQuery('(min-width: 768px)')
  const [modal, setModal] = useState({ alert: false, popup: false })

  const closePopup = useCallback(() => setModal((prev) => ({ ...prev, popup: false })), [])
  const openPopup = useCallback(() => setModal((prev) => ({ ...prev, popup: true })), [])
  const closeAlert = useCallback(() => setModal((prev) => ({ ...prev, alert: false })), [])
  const openAlert = useCallback(() => setModal((prev) => ({ ...prev, alert: true })), [])

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isMatch) {
        closeAlert()
      }

      if (!isMatch) {
        openAlert()
      }
    }, 100)

    return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMatch])

  return (
    <main className='py-4 dark:print:text-theme-800 dark:print:[&:is(h1)]:text-primary-700'>
      <CustomSeo {...meta} />

      <HowToPrintDialog isOpen={modal.popup} onClose={closePopup} />
      {modal.alert && <AlertResume isOpen={modal.alert} onClose={closeAlert} />}

      <section className='w-full mb-4'>
        <h1 className='text-center'>{HEADLINE.name}</h1>

        <div className='space-x-4 text-center mt-1.5'>
          {LINKS.map((s) => (
            <UnderlineLink className='print:text-primary-500' key={s.href} href={s.href}>
              {s.title}
            </UnderlineLink>
          ))}
        </div>
      </section>

      <div className='space-y-8'>
        <section>
          <div className='flex items-center justify-between pb-2.5 border-b-2 border-b-theme-700'>
            <h3>Tentang Saya</h3>

            <UnstyledButton onClick={openPopup} className='print:hidden'>
              <HiInformationCircle className='text-red-500 animate-pulse text-lg' />
              <span className='sr-only'>How to print?</span>
            </UnstyledButton>
          </div>

          <ul className={listStyle}>
            {SUMMARY.map((summ, idx) => {
              return (
                <li key={idx}>
                  {htmr(summ, {
                    transform: {
                      a: (props) => <UnderlineLink href={props.href ?? ''}>{props.children}</UnderlineLink>
                    }
                  })}
                </li>
              )
            })}
          </ul>
        </section>

        <section>
          <h3 className='mb-4 pb-2.5 border-b-2 border-b-theme-700'>Keterampilan</h3>

          <ul className={listStyle}>
            {SKILLS.map((skill) => (
              <li key={skill}>{skill}</li>
            ))}
          </ul>
        </section>

        <section>
          <h3 className='mb-4 pb-2.5 border-b-2 border-b-theme-700'>Kunci kemampuan</h3>

          <ul className={listStyle}>
            {KEY_SKILLS.map((skill, idx) => {
              return (
                <li key={idx}>
                  {htmr(skill, {
                    transform: {
                      a: (props) => <UnderlineLink href={props.href ?? ''}>{props.children}</UnderlineLink>
                    }
                  })}
                </li>
              )
            })}
          </ul>
        </section>

        <section>
          <h3 className='pb-2.5 border-b-2 border-b-theme-700'>Pendidikan</h3>

          {EDUCATION.map((ed) => (
            <div key={ed.school} className='mt-4'>
              <div className='flex items-start justify-between mb-2.5'>
                <h4 className='max-w-md'>{ed.school}</h4>
                <p className='text-sm font-semibold'>
                  {ed.period.start} - {ed.period.end}
                </p>
              </div>

              {ed.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}

              {ed.list && (
                <>
                  <p>{ed.list.title}</p>
                  <ul className={listStyle}>
                    {ed.list.listItem.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          ))}
        </section>

        <section>
          <div className='flex items-center justify-between pb-2.5 border-b-2 border-b-theme-700'>
            <h3>Pengalaman</h3>
          </div>

          {EXPERIENCE.map((exp, i) => (
            <div key={i} className='mt-4'>
              <div className='flex items-start justify-between mb-2.5'>
                <div>
                  <h4>{exp.companyName}</h4>
                  <h6>{exp.role}</h6>
                </div>

                <p className='text-sm font-semibold'>
                  {exp.period.start} - {exp.period.end}
                </p>
              </div>

              <ul className={listStyle}>
                {exp.lists.map((list, idx) => {
                  return (
                    <li key={idx}>
                      {htmr(list, {
                        transform: {
                          a: (props) => <UnderlineLink href={props.href ?? ''}>{props.children}</UnderlineLink>
                        }
                      })}
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </section>

        <section>
          <h3 className='mb-4 pb-2.5 border-b-2 border-b-theme-700'>Bahasa</h3>

          {LANGUAGES.map((lang) => (
            <p className='[&:not(:first-of-type)]:mt-2.5' key={lang.title}>
              <strong>{lang.title}:</strong> {lang.level}.
            </p>
          ))}
        </section>

        <section>
          <h3 className='mb-4 pb-2.5 border-b-2 border-b-theme-700'>Kontak Saya</h3>

          {CONTACT.map((cont) => (
            <li className='[&:not(:first-of-type)]:mt-2.5' key={cont.title}>
              <strong>{cont.title}:</strong> {cont.level}.
            </li>
          ))}
        </section>

      </div>
    </main>
  )
}

export default Resume
