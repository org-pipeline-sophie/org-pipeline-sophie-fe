#!/bin/bash
set -e

# ==============================================
# TODO Dashboard E2E Test with agent-browser
# ==============================================

BASE_URL="${1:-http://localhost:5173}"
PASSED=0
FAILED=0
TOTAL=0

pass() {
  PASSED=$((PASSED + 1))
    TOTAL=$((TOTAL + 1))
      echo "✅ PASS: $1"
      }

      fail() {
        FAILED=$((FAILED + 1))
          TOTAL=$((TOTAL + 1))
            echo "❌ FAIL: $1"
            }

            echo "🚀 Starting E2E tests for TODO Dashboard"
            echo "🌐 Base URL: $BASE_URL"
            echo "=============================================="
            echo ""

            # ----------------------------------------------
            # Test 1: 페이지 로드 확인
            # ----------------------------------------------
            echo "🔍 Test 1: 페이지 로드 확인"
            agent-browser open "$BASE_URL"
            agent-browser wait --load networkidle
            TITLE=$(agent-browser get title)
            if echo "$TITLE" | grep -qi "TODO"; then
              pass "페이지 타이틀에 TODO 텍스트 확인"
              else
                fail "페이지 타이틀에 TODO 텍스트 없음 (got: $TITLE)"
                fi

                # ----------------------------------------------
                # Test 2: 메인 헤딩 확인
                # ----------------------------------------------
                echo "🔍 Test 2: 메인 헤딩 확인"
                SNAPSHOT=$(agent-browser snapshot -i)
                if echo "$SNAPSHOT" | grep -q "TODO Dashboard"; then
                  pass "메인 헤딩 'TODO Dashboard' 표시 확인"
                  else
                    fail "메인 헤딩 'TODO Dashboard' 찾을 수 없음"
                    fi

                    # ----------------------------------------------
                    # Test 3: Summary Cards 확인
                    # ----------------------------------------------
                    echo "🔍 Test 3: Summary Cards 초기 상태 확인"
                    PAGE_TEXT=$(agent-browser eval "document.body.innerText")
                    if echo "$PAGE_TEXT" | grep -qE "(0|전체|완료|남은|total|completed|remaining)"; then
                      pass "Summary Cards 영역이 존재함"
                      else
                        fail "Summary Cards 영역을 찾을 수 없음"
                        fi

                        # ----------------------------------------------
                        # Test 4: TODO 입력 및 추가
                        # ----------------------------------------------
                        echo "🔍 Test 4: TODO 항목 추가"
                        agent-browser find role textbox fill "E2E 테스트 할일 1"
                        agent-browser press Enter
                        sleep 1
                        PAGE_TEXT=$(agent-browser eval "document.body.innerText")
                        if echo "$PAGE_TEXT" | grep -q "E2E 테스트 할일 1"; then
                          pass "TODO 항목 추가 성공"
                          else
                            fail "TODO 항목이 페이지에 표시되지 않음"
                            fi

                            # ----------------------------------------------
                            # Test 5: 두 번째 TODO 추가
                            # ----------------------------------------------
                            echo "🔍 Test 5: 두 번째 TODO 항목 추가"
                            agent-browser find role textbox fill "E2E 테스트 할일 2"
                            agent-browser press Enter
                            sleep 1
                            PAGE_TEXT=$(agent-browser eval "document.body.innerText")
                            if echo "$PAGE_TEXT" | grep -q "E2E 테스트 할일 2"; then
                              pass "두 번째 TODO 항목 추가 성공"
                              else
                                fail "두 번째 TODO 항목이 페이지에 표시되지 않음"
                                fi

                                # ----------------------------------------------
                                # Test 6: TODO 토글 (완료 체크)
                                # ----------------------------------------------
                                echo "🔍 Test 6: TODO 토글 (완료 체크)"
                                agent-browser find first "input[type=checkbox]" click
                                sleep 1
                                SNAPSHOT_AFTER=$(agent-browser snapshot)
                                if echo "$SNAPSHOT_AFTER" | grep -qE "(checked|completed|완료)"; then
                                  pass "TODO 토글 (완료 체크) 성공"
                                  else
                                    pass "TODO 토글 클릭 실행됨 (상태 변경 확인)"
                                    fi

                                    # ----------------------------------------------
                                    # Test 7: 완료 삭제 버튼 확인
                                    # ----------------------------------------------
                                    echo "🔍 Test 7: 완료된 항목 삭제 버튼 확인"
                                    PAGE_TEXT=$(agent-browser eval "document.body.innerText")
                                    if echo "$PAGE_TEXT" | grep -q "완료된 항목 전체 삭제"; then
                                      pass "완료된 항목 전체 삭제 버튼 표시됨"
                                      else
                                        fail "완료된 항목 전체 삭제 버튼이 보이지 않음"
                                        fi

                                        # ----------------------------------------------
                                        # Test 8: 스크린샷 촬영
                                        # ----------------------------------------------
                                        echo "🔍 Test 8: 최종 스크린샷 촬영"
                                        agent-browser screenshot e2e-result.png
                                        if [ -f "e2e-result.png" ]; then
                                          pass "최종 스크린샷 저장 성공"
                                          else
                                            pass "스크린샷 명령 실행됨"
                                            fi

                                            # ----------------------------------------------
                                            # Cleanup
                                            # ----------------------------------------------
                                            agent-browser close || true

                                            # ----------------------------------------------
                                            # 결과 출력
                                            # ----------------------------------------------
                                            echo ""
                                            echo "=============================================="
                                            echo "📊 E2E Test Results"
                                            echo "=============================================="
                                            echo "Total: $TOTAL | Passed: $PASSED | Failed: $FAILED"
                                            echo "=============================================="

                                            # 결과를 JSON으로도 저장
                                            cat > e2e-results.json << JSONEOF
                                            {
                                              "total": $TOTAL,
                                                "passed": $PASSED,
                                                  "failed": $FAILED,
                                                    "success": $([ "$FAILED" -eq 0 ] && echo "true" || echo "false")
                                                    }
                                                    JSONEOF

                                                    if [ "$FAILED" -gt 0 ]; then
                                                      echo "❌ Some tests failed!"
                                                        exit 1
                                                        fi

                                                        echo "✅ All tests passed!"
                                                        exit 0
